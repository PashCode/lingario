import type {
  AddWordToPersonalDictProps,
  DBOxford3000Values,
  GenerateSentenceForPersonalWordProps,
} from "@/features/dictionaries/types";
import { getDownloadURL } from "firebase/storage";
import { oxford3000Storage } from "@/config/firebase";
import { db } from "@/config/firebase";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  SENTENCE_CREATING,
  SENTENCE_ERROR,
} from "@/features/dictionaries/utils/constants";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/config/functions";


// oxford3000 words come from one file in Storage, not from Firestore
// every user gets the same ~3000 words, so one file is enough
export async function getOxford3000FromDB() {
  const oxford3000Link = await getDownloadURL(oxford3000Storage);
  const response = await fetch(oxford3000Link);
  const oxford3000Dictionary = await response.json();

  // the json file uses short names (e, u, l) to make the file smaller
  // here we change them to real names
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

export async function generateSentenceForPersonalWord({
  id,
  englishWord,
  level,
}: GenerateSentenceForPersonalWordProps) {
  const currentUser = requireCurrentUser();
  const docRef = doc(db, "users", currentUser.uid, "dictionary", id);

  try {
    const sentence = await createSentenceForPersonalDict(englishWord, level);
    await updateDoc(docRef, { sentence });
  } catch (error) {
    await updateDoc(docRef, { sentence: SENTENCE_ERROR });
    throw error;
  }
}

export async function retrySentenceForPersonalWord(
  params: GenerateSentenceForPersonalWordProps,
) {
  const currentUser = requireCurrentUser();
  const docRef = doc(db, "users", currentUser.uid, "dictionary", params.id);
  await updateDoc(docRef, { sentence: SENTENCE_CREATING });
  await generateSentenceForPersonalWord(params);
}

export async function createSentenceForPersonalDict(word: string, level: string) {
  const createSentence = httpsCallable(functions, "createSentenceForPersonalDict");
  const result = await createSentence({ word, level });
  return result.data as string;
}
