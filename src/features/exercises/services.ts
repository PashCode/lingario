import { db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import type {
  InProgressWordsValues,
  NewWordsValues,
} from "@/features/exercises/types";
import type { RefObject } from "react";
import { writeBatch } from "firebase/firestore";
import requireCurrentUser from "@/shared/utils/auth/requireCurrentUser";

// saves all words of the session in one write, not one by one
export async function saveSessionResultsToDB({
  current: updatedWords,
}: RefObject<Record<string, NewWordsValues | InProgressWordsValues>>) {
  const currentUser = requireCurrentUser();
  const batch = writeBatch(db);

  for (const word in updatedWords) {
    const docRef = doc(db, "users", currentUser.uid, "dictionary", word);

    batch.update(docRef, {
      score: Number(updatedWords[word].score.toFixed(3)),
      nextRepeat: updatedWords[word].nextRepeat,
      progress: updatedWords[word].progress,
    });
  }

  await batch.commit();
}
