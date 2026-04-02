import FlashCard from "@/features/exercises/components/exercises/FlashCard";
import WordMatching from "@/features/exercises/components/exercises/WordMatching";
import WordBuilding from "@/features/exercises/components/exercises/WordBuilding";
import WordListening from "@/features/exercises/components/exercises/WordListening";
import MultipleChoices from "@/features/exercises/components/exercises/MultipleChoices";
import { useAppSelector } from "@/app/store";
import { selectNewWords, selectRepeatWords } from "@/features/exercises/slice";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import type { ExerciseConfigValues, SessionSequenceValues, } from "@/features/exercises/types";
import { shuffleArray } from "@/features/exercises/utils/helpers";

const EXERCISES_DEFINITIONS = {
  flashCard: { component: FlashCard, wordsPerIteration: 1, phase: 1 },
  wordListening: { component: WordListening, wordsPerIteration: 1, phase: 2 },
  wordMatching: { component: WordMatching, wordsPerIteration: 1, phase: 2 },
  multipleChoices: { component: MultipleChoices, wordsPerIteration: 4, phase: 2 },
  wordBuilding: { component: WordBuilding, wordsPerIteration: 1, phase: 3 },
};

function useExercisesSettings() {
  const newWords = useAppSelector(selectNewWords);
  const repeatWords = useAppSelector(selectRepeatWords);
  const exerciseType = useLocation().state?.exerciseType;
  const words = exerciseType === "repeat-words" ? repeatWords : newWords;

  const [wordsLimit, setWordsLimit] = useState(5);
  const [isExerciseSelectionEmpty, setIsExerciseSelectionEmpty] = useState(false);
  const [voiceSetting, setVoiceSetting] = useState({
    voice: "en-US-Neural2-D",
    gender: "MALE",
  });

  const [selectedExercises, setSelectedExercises] = useState({
    flashCard: false,
    wordMatching: false,
    wordBuilding: false,
    multipleChoices: false,
    wordListening: false,
  });

  const exercisesConfig = useMemo<ExerciseConfigValues>(() => {
    const sessionItems: Array<SessionSequenceValues> = [];
    const limitedWords = words.slice(0, wordsLimit);

    for (const exerciseKey in selectedExercises) {
      const exerciseName = exerciseKey as keyof typeof selectedExercises;

      if (!selectedExercises[exerciseName]) continue;

      const exerciseDefinition = EXERCISES_DEFINITIONS[exerciseName];
      const wordsGroup = [];

      for (
        let i = 0;
        i < limitedWords.length;
        i += exerciseDefinition.wordsPerIteration
      ) {
        wordsGroup.push(
          limitedWords.slice(i, i + exerciseDefinition.wordsPerIteration),
        );
      }

      if (
        exerciseName === "multipleChoices" &&
        wordsGroup.at(-1)?.length === 1
      ) {
        const lastWordFromGroup = wordsGroup.pop()!;
        wordsGroup[wordsGroup.length - 1].push(...lastWordFromGroup);
      }

      wordsGroup.forEach((wordGroup) => {
        sessionItems.push({
          word: wordGroup[0],
          words: exerciseDefinition.wordsPerIteration > 1 ? wordGroup : null,
          exercise: exerciseDefinition.component,
          phase: exerciseDefinition.phase,
        });
      });
    }

    const phase1 = shuffleArray( sessionItems.filter((item) => item.phase === 1));
    const phase2 = shuffleArray( sessionItems
      .filter((item) => item.phase === 2))
      .sort((a, b) => (b.words?.length || 0) - (a.words?.length || 0));
    const phase3 = shuffleArray( sessionItems.filter((item) => item.phase === 3));

    return {
      voiceSetting,
      vocabularyWords: [...words],
      selectedExercises,
      wordsLimit,
      isReady: true,
      multiplier: Object.values(selectedExercises).filter(Boolean).length,
      sessionWords: limitedWords,
      sessionSequence: [...phase1, ...phase2, ...phase3],
    };
  }, [words, wordsLimit, selectedExercises, voiceSetting]);


  return {
    exercisesConfig,
    voiceSetting,
    setVoiceSetting,
    wordsLimit,
    setWordsLimit,
    selectedExercises,
    setSelectedExercises,
    isExerciseSelectionEmpty,
    setIsExerciseSelectionEmpty,
  };
}

export default useExercisesSettings;
