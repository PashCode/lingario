import FlashCard from "@/features/exercises/components/exercises/FlashCard";
import WordMatching from "@/features/exercises/components/exercises/WordMatching";
import { useAppSelector } from "@/app/store";
import { selectNewWords, selectRepeatWords } from "@/features/exercises/slice";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const exercises = { flashCard: FlashCard, wordMatching: WordMatching };

function useExercisesSettings() {
  const newWords = useAppSelector(selectNewWords);
  const repeatWords = useAppSelector(selectRepeatWords);
  const exerciseType = useLocation().state?.exerciseType;
  const words = exerciseType === "repeat-words" ? repeatWords : newWords;

  const [wordsCount, setWordsCount] = useState(0);
  const [pronunciation, setPronunciation] = useState({
    voice: "en-US-Neural2-D",
    gender: "MALE",
  });
  const [selectedExercises, setSelectedExercises] = useState({
    flashCard: false,
    wordMatching: false,
  });

  const exercisesSettings = {
    pronunciation: pronunciation,
    words: [...words],
    exercises: selectedExercises,
    wordsCount: wordsCount,
    isReady: true,
  };

  function addWordWithExercise() {
    const exercisesByType = {
      flashCard: [],
      wordMatching: [],
    };

    function pushItem(exercisesByType, wordsCount, word, exercises, key) {
      if (exercisesByType[key].length >= wordsCount) return;

      exercisesByType[key].push({
        word: word,
        exercise: exercises[key],
      });
    }

    for (const exerciseType in exercisesSettings.exercises) {
      const key = exerciseType as keyof typeof exercisesSettings.exercises;

      if (exercisesSettings.exercises[key]) {
        words.forEach((word) => {
          pushItem(exercisesByType, wordsCount, word, exercises, key);
        });
      }
    }

    return {
      ...exercisesSettings,
      exercisesData: [
        ...exercisesByType.flashCard,
        ...exercisesByType.wordMatching,
      ],
      isReady: true,
    };
  }

  const exercisesConfig = addWordWithExercise();

  return {
    exercisesConfig,
    pronunciation,
    setPronunciation,
    wordsCount,
    setWordsCount,
    selectedExercises,
    setSelectedExercises,
  };
}

export default useExercisesSettings;
