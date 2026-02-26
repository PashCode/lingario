import { auth, db } from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useDictSnapshot<T>() {
    const [personalDictionary, setPersonalDictionary] = useState<Array<T>>([]);
    const [isDictLoading, setIsDictLoading] = useState(true);

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
                setIsDictLoading(false);
            },
        );
        return unsubscribe;
    }, []);

    return { personalDictionary, isDictLoading };
}

export default useDictSnapshot;
