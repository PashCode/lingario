import FlashCard from "@/features/exercises/components/exercises/FlashCard";
import WordMatching from "@/features/exercises/components/exercises/WordMatching";
import { useAppSelector } from "@/app/store";
import { selectNewWords, selectRepeatWords } from "@/features/exercises/slice";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const EXERCISES = { flashCard: FlashCard, wordMatching: WordMatching };

function useExercisesSettings() {
  const newWords = useAppSelector(selectNewWords);
  const repeatWords = useAppSelector(selectRepeatWords);
  const exerciseType = useLocation().state?.exerciseType;
  const words = exerciseType === "repeat-words" ? repeatWords : newWords;

  const [wordsCount, setWordsCount] = useState(5);
  const [showError, setShowError] = useState(false);
  const [pronunciation, setPronunciation] = useState({
    voice: "en-US-Neural2-D",
    gender: "MALE",
  });
  const [selectedExercises, setSelectedExercises] = useState({
    flashCard: false,
    wordMatching: false,
  });

  const exercisesSettings = {
    pronunciation,
    words: [...words],
    selectedExercises,
    wordsCount,
    isReady: false,
  };

  function addWordWithExercise() {
    const exercisesByType = {
      flashCard: [],
      wordMatching: [],
    };

    function pushItem(word, key) {
      if (exercisesByType[key].length >= wordsCount) return;

      exercisesByType[key].push({
        word: word,
        exercise: EXERCISES[key],
      });
    }

    function shuffleExercises() {
      const array = [
        ...exercisesByType.flashCard,
        ...exercisesByType.wordMatching,
      ];

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    for (const exerciseType in exercisesSettings.selectedExercises) {
      const key = exerciseType as keyof typeof exercisesSettings.selectedExercises;

      if (exercisesSettings.selectedExercises[key]) {
        words.forEach((word) => {
          pushItem(word, key);
        });
      }
    }

    const shuffledExercises = shuffleExercises();

    return {
      ...exercisesSettings,
      exercisesData: shuffledExercises,
      isReady: true,
    };
  }

  const exercisesConfig = addWordWithExercise();
  console.log(addWordWithExercise());

  return {
    exercisesConfig,
    pronunciation,
    setPronunciation,
    wordsCount,
    setWordsCount,
    selectedExercises,
    setSelectedExercises,
    showError,
    setShowError,
  };
}

export default useExercisesSettings;
