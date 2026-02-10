import { auth, db } from "@/config/firebase";
import type { Oxford3000Values } from "@/features/dictionary/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useDictSnapshot() {
  const [personalWords, setPersonalWords] = useState<Array<Oxford3000Values>>(
    [],
  );

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", auth.currentUser.uid, "dictionary"),
      (snapshot) => {
        if (snapshot.docs) {
          const personalWordsArray = snapshot.docs.map((word) => word.data());
          setPersonalWords(personalWordsArray as Array<Oxford3000Values>);
        }
      },
    );
    return unsubscribe;
  }, []);

  return personalWords;
}

export default useDictSnapshot;
