import type {
  AddWordToPersonalDictProps,
  DBOxford3000Values,
  FetchTTSProps,
  FetchTTSResponse,
} from "@/features/dictionary/types";
import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage, auth } from "@/config/firebase";
import { googleTTS, geminiAI } from "@/config/gemini";
import { db } from "@/config/firebase";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

export async function getOxford3000FromDB() {
  const oxford3000Link = await getDownloadURL(oxford3000Storage);
  const response = await fetch(oxford3000Link);
  const oxford3000Dictionary = await response.json();

  return oxford3000Dictionary.map((word: DBOxford3000Values) => {
    return {
      englishWord: word.e,
      translation: word.u,
      level: word.l,
    };
  });
}

export async function fetchPronunciation(
  text: FetchTTSProps,
): Promise<FetchTTSResponse | undefined> {
  const API_KEY = googleTTS.apiKey;
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: "en-US",
          name: "en-US-Neural2-D",
          ssmlGender: "MALE",
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 0.9,
        },
      }),
    });
    const data = await response.json();

    if (!response.ok || !data.audioContent) {
      throw new Error(data.error?.message || "No audio content");
    }
    return data;
  } catch (error) {
    console.error("Error speaking word:", error);
  }
}

export async function addWordToPersonalDict(
  wordData: AddWordToPersonalDictProps,
) {
  if (!auth.currentUser) return;

  const docRef = doc(
    db,
    "users", auth.currentUser.uid,
    "dictionary", wordData.id,
  );

  await setDoc(docRef, wordData);

  if (wordData.progress === "new" || wordData.progress === "in progress") {
    const phrase = await createPhraseForPersonalDict(
      wordData.englishWord,
      wordData.level,
    );
    await updateDoc(docRef, { phrase });
  }
}

export async function deleteWordFromPersonalDict(id: string) {
  if (!auth.currentUser) return;

  const docRef = doc(db, "users", auth.currentUser.uid, "dictionary", id);
  await deleteDoc(docRef);
}

export async function createPhraseForPersonalDict(word: string, level: string) {
  const response = await geminiAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          sentence: { type: "string" },
        },
        required: ["sentence"],
      },
      temperature: 1,
      maxOutputTokens: 50,
    },
    contents:
      `Task: Create one grammatically correct sentence ${level} level.\n` +
      "Length: No more than 10 words\n" +
      `Vocabulary: Use the word "${word}" and wrap it in double asterisks (like ***${word}***)\n` +
      "Topic: Random everyday theme\n",
  });

  if (!response.text) return;
  const parsed = JSON.parse(response.text);
  return parsed.sentence;
}
