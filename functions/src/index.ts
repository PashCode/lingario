import { defineSecret } from "firebase-functions/params";
import { setGlobalOptions } from "firebase-functions/v2";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { GoogleGenAI } from "@google/genai";

setGlobalOptions({ maxInstances: 10 });

const TTS_API_KEY = defineSecret("TTS_API_KEY");
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const MAIN_GEMINI_MODEL = "gemini-3.1-flash-lite-preview";
const EXTRA_GEMINI_MODEL = "gemini-3.5-flash";
async function createSentenceForPersonalDictHandler(
  request: {
    auth?: unknown;
    data: {
      word?: string;
      level?: string;
      retryCount?: number;
      model?: string;
    };
  },
): Promise<string> {
  const { word, level, retryCount = 0, model = MAIN_GEMINI_MODEL } = request.data;

  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Потрібна авторизація");
  }

  if (!word || !level) {
    throw new HttpsError("invalid-argument", "Не передано word або level");
  }

  const geminiAI = new GoogleGenAI({
    apiKey: GEMINI_API_KEY.value(),
  });

  try {
    const response = await geminiAI.models.generateContent({
      model: model,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: { sentence: { type: "string" } },
          required: ["sentence"],
        },
        systemInstruction:
          "Use the exact dictionary word only. Do not change its form. Do not add endings like -ed, -ing, or -s.",
        temperature: 1,
        maxOutputTokens: 150,
      },
      contents:
        `Task: Create one grammatically correct sentence ${level} level.\n` +
        "Length: No more than 10 words\n" +
        `Vocabulary: Use the word "${word}" and wrap it in double asterisks (like **${word}**)\n` +
        "Topic: Random everyday theme\n" +
        "Ending: No period at the end",
    });

    if (!response.text) {
      throw new Error(
        "Gemini API повернуло порожню відповідь (response.text is empty)",
      );
    }

    const parsed = JSON.parse(response.text) as { sentence?: string };
    return parsed.sentence ?? "";
  } catch (error) {
    console.error(
      "[GEMINI ERROR]",
      error instanceof Error ? error.message : "Unknown error",
    );
    console.warn(`[WARNING]: Спроба генерації фрази: ${retryCount + 1} / 3`);

    if (retryCount === 2) {
      console.error("[ERROR]: Всі 3 спроби генерації вичерпано.");
      throw new HttpsError("internal", "Не вдалося згенерувати фразу");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return createSentenceForPersonalDictHandler({
      ...request,
      data: {
        word,
        level,
        retryCount: retryCount + 1,
        model: EXTRA_GEMINI_MODEL,
      },
    });
  }
}

async function createHomepageAISentenceHandler(
  request: {
    auth?: unknown;
    data: {
      englishWord?: string;
      level?: string;
      retryCount?: number;
      model?: string;
    };
  },
): Promise<string> {
  const {
    englishWord,
    level,
    retryCount = 0,
    model = MAIN_GEMINI_MODEL,
  } = request.data;

  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Потрібна авторизація");
  }

  const geminiAI = new GoogleGenAI({
    apiKey: GEMINI_API_KEY.value(),
  });

  try {
    const response = await geminiAI.models.generateContent({
      model: model,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: { sentence: { type: "string" } },
          required: ["sentence"],
        },
        systemInstruction:
          "Use the exact dictionary word only. Do not change its form. Do not add endings like -ed, -ing, or -s.",
        temperature: 1,
        maxOutputTokens: 150,
      },
      contents:
        englishWord && level
          ? `Task: Create one grammatically correct sentence ${level} level.\n` +
            "Length: No more than 10 words\n" +
            `Vocabulary: Use the word "${englishWord}" and wrap it in double asterisks (like **${englishWord}**)\n` +
            "Topic: Random everyday theme\n" +
            "Ending: No period at the end"
          : "Task: Create one grammatically correct sentence\n" +
            "Length: Exactly 10 words\n" +
            "Vocabulary: Only Oxford 3000, A2 level\n" +
            "Topic: Random everyday theme\n" +
            "Ending: No period at the end",
    });

    if (!response.text) {
      throw new Error(
        "Gemini API повернуло порожню відповідь (response.text is empty)",
      );
    }

    const parsed = JSON.parse(response.text) as { sentence?: string };
    return parsed.sentence ?? "";
  } catch (error) {
    console.error(
      "[GEMINI ERROR]",
      error instanceof Error ? error.message : "Unknown error",
    );
    console.warn(`[WARNING]: Спроба генерації фрази: ${retryCount + 1} / 3`);

    if (retryCount === 2) {
      console.error("[ERROR]: Всі 3 спроби генерації вичерпано.");
      throw new HttpsError("internal", "Не вдалося згенерувати фразу");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return createHomepageAISentenceHandler({
      ...request,
      data: {
        englishWord,
        level,
        retryCount: retryCount + 1,
        model: EXTRA_GEMINI_MODEL,
      },
    });
  }
}

export const createSentenceForPersonalDict = onCall(
  { region: "europe-central2", secrets: [GEMINI_API_KEY] },
  async (request) => {
    return createSentenceForPersonalDictHandler(request as never);
  },
);

export const createHomepageAISentence = onCall(
  { region: "europe-central2", secrets: [GEMINI_API_KEY] },
  async (request) => {
    return createHomepageAISentenceHandler(request as never);
  },
);

export const fetchPronunciation = onCall(
  { region: "europe-central2", secrets: [TTS_API_KEY] },
  async (request) => {
    const { text, voiceName, gender } = request.data as {
      text?: string;
      voiceName?: string;
      gender?: string;
    };

    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Потрібна авторизація");
    }

    if (!text) {
      throw new HttpsError("invalid-argument", "Не передано text");
    }

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${TTS_API_KEY.value()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: "en-US",
              name: voiceName || "en-US-Neural2-D",
              ssmlGender: gender || "MALE",
            },
            audioConfig: {
              audioEncoding: "MP3",
              speakingRate: 0.9,
            },
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.audioContent) {
        throw new Error(data.error?.message || "No audio content");
      }

      return data;
    } catch (error) {
      console.error("[TTS ERROR]", error);
      throw new HttpsError("internal", "Не вдалося озвучити текст");
    }
  },
);
