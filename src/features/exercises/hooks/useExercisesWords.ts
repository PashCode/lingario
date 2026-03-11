import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import { setNewWords, setRepeatWords } from "@/features/exercises/slice";
import { useAppDispatch } from "@/app/store";
import { useEffect } from "react";
import type {
  ExercisesState,
  NewWordsValues,
  InProgressWordsValues,
} from "@/features/exercises/types";

function useExercisesWords() {
  const { personalDictionary } = useDictSnapshot<
    NewWordsValues | InProgressWordsValues
  >();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const personalWordsProgress: ExercisesState = {
      newWords: [],
      repeatWords: [],
    };

    if (personalDictionary.length > 0) {
      personalDictionary.forEach((word) => {
        if (word.progress === "new") {
          personalWordsProgress.newWords.push(word);
        }
        if (word.progress === "in progress") {
          personalWordsProgress.repeatWords.push(word);
        }
      });
    }

    dispatch(setNewWords(personalWordsProgress.newWords));
    dispatch(setRepeatWords(personalWordsProgress.repeatWords));
  }, [personalDictionary, dispatch]);
}

export default useExercisesWords;
