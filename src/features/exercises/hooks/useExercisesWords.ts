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
  SENTENCE_CREATING,
  SENTENCE_ERROR,
} from "@/features/dictionaries/utils/constants";

// splits the personal dictionary into two groups:
// words to learn now, and words that are ready to repeat today
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

        // word is ready only if its sentence is already generated
        const isSentenceReady =
          !!word.sentence &&
          word.sentence !== SENTENCE_CREATING &&
          word.sentence !== SENTENCE_ERROR;

        // new words that never studied before
        if (word.progress === "new" && isSentenceReady) {
          personalWordsProgress.newWords.push(word);
        }

        // repeat words that already studied and the next repeat date has come
        if (
          isSentenceReady &&
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

  return { personalDictionary, isPersonalDictLoading };
}

export default useExercisesWords;
