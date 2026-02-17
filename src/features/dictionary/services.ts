import type {
  DBOxford3000Values,
  fetchTTSProps,
  fetchTTSResponse,
} from "@/features/dictionary/types";
import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage, auth } from "@/config/firebase";
import { googleTTS, geminiAI } from "@/config/gemini";
import type { GenerateContentResponse } from "@google/genai";
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
  text: fetchTTSProps = "Audio error, please try again later ",
): Promise<fetchTTSResponse | undefined> {
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

export async function addToPersonalDict(wordObject: any) {
  if (!auth.currentUser) return;

  const docRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "dictionary",
    wordObject.id,
  );

  await setDoc(docRef, wordObject);

  if (wordObject.progress === "new" || wordObject.progress === "in progress") {
    const phrase = await addPhraseToPersonalWord(
      wordObject.englishWord,
      wordObject.level,
    );

    await updateDoc(docRef, { phrase });
  }
}

export async function deleteFromPersonalDict(id: any) {
  if (!auth.currentUser) return;
  const docRef = doc(db, "users", auth.currentUser.uid, "dictionary", id);
  await deleteDoc(docRef);
}

export async function addPhraseToPersonalWord(word: string, level: string) {
  const response: GenerateContentResponse =
    await geminiAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents:
        `Task: Create one grammatically correct sentence ${level} level.` +
        "Length: No more then 10 words\n" +
        `Vocabulary: With this word: ${word}` +
        "Topic: Random everyday theme\n" +
        "Output: Sentence only, no additional text\n" +
        "\n",
    });

  return response.text;
}
