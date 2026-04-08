import type {
  AddWordToPersonalDictProps,
  DBOxford3000Values,
  GeneratePhraseForPersonalWordProps,
} from "@/features/dictionaries/types";
import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage } from "@/config/firebase";
import { geminiAI } from "@/config/gemini";
import { db } from "@/config/firebase";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  PHRASE_CREATING,
  PHRASE_ERROR,
} from "@/features/dictionaries/utils/constants";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";

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

export async function deleteWordFromPersonalDict(id: string) {
  const currentUser = requireCurrentUser();
  const docRef = doc(db, "users", currentUser.uid, "dictionary", id);
  await deleteDoc(docRef);
}

export async function addWordToPersonalDict(
  wordData: AddWordToPersonalDictProps,
) {
  const currentUser = requireCurrentUser();
  const docRef = doc(db, "users", currentUser.uid, "dictionary", wordData.id);
  await setDoc(docRef, wordData);
}

export async function generatePhraseForPersonalWord({
  id,
  englishWord,
  level,
}: GeneratePhraseForPersonalWordProps) {
  const currentUser = requireCurrentUser();
  const docRef = doc(db, "users", currentUser.uid, "dictionary", id);

  try {
    const phrase = await createPhraseForPersonalDict(englishWord, level);
    await updateDoc(docRef, { phrase });
  } catch (error) {
    await updateDoc(docRef, { phrase: PHRASE_ERROR });
    throw error;
  }
}

export async function retryPhraseForPersonalWord(
  params: GeneratePhraseForPersonalWordProps,
) {
  const currentUser = requireCurrentUser();
  const docRef = doc(db, "users", currentUser.uid, "dictionary", params.id);
  await updateDoc(docRef, { phrase: PHRASE_CREATING });
  await generatePhraseForPersonalWord(params);
}

export async function createPhraseForPersonalDict(
  word: string,
  level: string,
  retryCount = 0,
) {
  try {
    const response = await geminiAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
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
        "Topic: Random everyday theme\n",
    });

    if (!response.text) {
      throw new Error(
        "Gemini API повернуло порожню відповідь (response.text is empty)",
      );
    }

    const parsed = JSON.parse(response.text);
    return parsed.sentence;
  } catch (error) {
    console.warn(`[WARNING]: Спроба генерації фрази: ${retryCount + 1} / 3`);

    if (retryCount === 2) {
      console.error("[ERROR]: Всі 3 спроби генерації вичерпано.");
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return createPhraseForPersonalDict(word, level, retryCount + 1);
  }
}
