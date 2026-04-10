import { auth, db } from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useDictSnapshot<T>() {
  const [personalDictionary, setPersonalDictionary] = useState<Array<T>>([]);
  const [isPersonalDictLoading, setIsPersonalDictLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "users", auth.currentUser.uid, "dictionary"),
      (snapshot) => {
        if (snapshot.docs) {
          const personalDictArray = snapshot.docs.map((word) => word.data());
          setPersonalDictionary(personalDictArray as Array<T>);
        }
        setIsPersonalDictLoading(false);
      },
      (error) => {
        console.error("[ERROR]", error);
        setIsPersonalDictLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { personalDictionary, isPersonalDictLoading };
}

export default useDictSnapshot;
