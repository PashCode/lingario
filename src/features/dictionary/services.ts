import type {
  fetchTTSProps,
  fetchTTSResponse,
} from "@/features/dictionary/types";
import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage, auth } from "@/config/firebase";
import { googleTTS } from "@/config/gemini";
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function getOxford3000FromDB() {
  const oxford3000Link = await getDownloadURL(oxford3000Storage);
  const oxford3000Dictionary = await fetch(oxford3000Link);
  return await oxford3000Dictionary.json();
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

export async function addToPersonalDict(wordObject) {
  if (!auth.currentUser) return;
  const docRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "dictionary",
    wordObject.id,
  );
  await setDoc(docRef, wordObject);
}
