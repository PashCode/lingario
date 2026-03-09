import type {
  AddWordToPersonalDictProps,
  DBOxford3000Values,
} from "@/features/dictionaries/types";
import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage, auth } from "@/config/firebase";
import { geminiAI } from "@/config/gemini";
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
  console.log(id);

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
      `Vocabulary: Use the word "${word}" and wrap it in triple asterisks (like ***${word}***)\n` +
      "Topic: Random everyday theme\n",
  });

  if (!response.text) return;
  const parsed = JSON.parse(response.text);
  return parsed.sentence;
}
