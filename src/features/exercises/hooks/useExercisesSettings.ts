import FlashCard from "@/features/exercises/components/exercises/FlashCard";
import WordMatching from "@/features/exercises/components/exercises/WordMatching";
import CollectWord from "@/features/exercises/components/exercises/CollectWord";
import { useAppSelector } from "@/app/store";
import { selectNewWords, selectRepeatWords } from "@/features/exercises/slice";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import type {
  ExerciseConfigValues,
  ExercisesByTypeValues,
  SessionSequenceValues,
} from "@/features/exercises/types";

const EXERCISES = {
  flashCard: FlashCard,
  wordMatching: WordMatching,
  collectWord: CollectWord,
};

function useExercisesSettings() {
  const newWords = useAppSelector(selectNewWords);
  const repeatWords = useAppSelector(selectRepeatWords);
  const exerciseType = useLocation().state?.exerciseType;
  const words = exerciseType === "repeat-words" ? repeatWords : newWords;

  const [wordsLimit, setWordsLimit] = useState(5);
  const [showError, setShowError] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: "en-US-Neural2-D",
    gender: "MALE",
  });
  const [selectedExercises, setSelectedExercises] = useState({
    flashCard: false,
    wordMatching: false,
    collectWord: false,
  });

  const exercisesByType: ExercisesByTypeValues = {
    flashCard: [],
    wordMatching: [],
    collectWord: [],
  };

  const exercisesSettings: ExerciseConfigValues = {
    voiceSettings,
    vocabularyWords: [...words],
    sessionWords: [],
    sessionSequence: [],
    selectedExercises,
    wordsLimit,
    isReady: false,
    multiplier: Object.values(selectedExercises).filter((value) => value).length,
  };

  function generateSessionSequence() {
    function pushItem(
      word: SessionSequenceValues["word"],
      key: keyof ExercisesByTypeValues,
    ) {
      if (exercisesByType[key].length >= wordsLimit) return;

      exercisesByType[key].push({
        word: word,
        exercise: EXERCISES[key],
      });
    }

    function shuffleExercises() {
      const array = [
        ...exercisesByType.flashCard,
        ...exercisesByType.wordMatching,
        ...exercisesByType.collectWord
      ];

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    for (const exerciseType in exercisesSettings.selectedExercises) {
      const key =
        exerciseType as keyof typeof exercisesSettings.selectedExercises;

      if (exercisesSettings.selectedExercises[key]) {
        words.forEach((word) => {
          pushItem(word, key);
        });
      }
    }
    const shuffledExercises = shuffleExercises();

    return {
      ...exercisesSettings,
      sessionSequence: shuffledExercises,
      isReady: true,
    };
  }
  const partialConfig = generateSessionSequence();

  function addSessionWords() {
    const sessionWordsSource: SessionSequenceValues[] =
      Object.values(exercisesByType).find((arr) => arr.length > 0) || [];

    const sessionWords = sessionWordsSource.map(({ word }) => word);
    return { ...partialConfig, sessionWords: sessionWords };
  }

  const exercisesConfig = addSessionWords();
  // console.log(exercisesConfig);

  return {
    exercisesConfig,
    voiceSettings,
    setVoiceSettings,
    wordsLimit,
    setWordsLimit,
    selectedExercises,
    setSelectedExercises,
    showError,
    setShowError,
  };
}

export default useExercisesSettings;
