import { auth, db } from "@/config/firebase";
import type { Oxford3000Values } from "@/features/dictionary/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useDictSnapshot() {
  const [personalDictionary, setPersonalDictionary] = useState<
    Array<Oxford3000Values>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "users", auth.currentUser.uid, "dictionary"),
      (snapshot) => {
        if (snapshot.docs) {
          const personalDictArray = snapshot.docs.map((word) => word.data());
          setPersonalDictionary(personalDictArray as Array<Oxford3000Values>);
        }
        setIsLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { personalDictionary, isLoading };
}

export default useDictSnapshot;
