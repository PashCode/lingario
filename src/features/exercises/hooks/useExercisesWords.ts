import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import { setNewWords, setRepeatWords } from "@/features/exercises/slice";
import { useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import type {
  NewWordsValues,
  InProgressWordsValues,
  PersonalWordsProgressValues,
} from "@/features/exercises/types";
import {
  PHRASE_CREATING,
  PHRASE_ERROR,
} from "@/features/dictionaries/utils/constants";

function useExercisesWords() {
  const { personalDictionary, isPersonalDictLoading } = useDictSnapshot<
    NewWordsValues | InProgressWordsValues
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const personalWordsProgress: PersonalWordsProgressValues = {
      newWords: [],
      repeatWords: [],
    };
    const currentDate = new Date();

    if (personalDictionary.length > 0) {
      personalDictionary.forEach((word) => {
        const repeatDate = word.nextRepeat?.toDate();
        const isPhraseReady =
          !!word.phrase &&
          word.phrase !== PHRASE_CREATING &&
          word.phrase !== PHRASE_ERROR;

        if (word.progress === "new" && isPhraseReady) {
          personalWordsProgress.newWords.push(word);
        }

        if (
          isPhraseReady &&
          word.progress === "in progress" &&
          repeatDate <= currentDate
        ) {
          personalWordsProgress.repeatWords.push(word);
        }
      });
    }

    dispatch(setNewWords(personalWordsProgress.newWords));
    dispatch(setRepeatWords(personalWordsProgress.repeatWords));
  }, [personalDictionary, dispatch]);

  return isPersonalDictLoading;
}

export default useExercisesWords;
