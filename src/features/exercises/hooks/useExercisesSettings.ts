import FlashCard from "@/features/exercises/components/exercises/session/FlashCard";
import WordMatching from "@/features/exercises/components/exercises/session/WordMatching";
import WordBuilding from "@/features/exercises/components/exercises/session/WordBuilding";
import WordListening from "@/features/exercises/components/exercises/session/WordListening";
import MultipleChoices from "@/features/exercises/components/exercises/session/MultipleChoices";
import { useAppSelector } from "@/app/store";
import {
  selectExercisesConfig,
  selectNewWords,
  selectRepeatWords,
} from "@/features/exercises/slice";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import type { ExerciseConfigValues, SessionSequenceValues, } from "@/features/exercises/types";
import { shuffleArray } from "@/features/exercises/utils/helpers";

// all exercise types in one place
// wordsPerIteration: how many words one exercise needs at a time
// phase: the order in a session — first you meet the word, then you
// recognize it, and only then you write it
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
  const savedConfig = useAppSelector(selectExercisesConfig);

  // coming from the exercises screen we get the type in location state, but
  // coming back from a session there is no state — fall back to the saved one
  const exerciseType =
    useLocation().state?.exerciseType || savedConfig.exerciseType;
  const words = exerciseType === "repeat-words" ? repeatWords : newWords;

  const [wordsCount, setWordsCount] = useState(4);
  const [isExerciseSelectionEmpty, setIsExerciseSelectionEmpty] = useState(false);

  const [selectedExercises, setSelectedExercises] = useState({
    flashCard: false,
    wordMatching: false,
    wordBuilding: false,
    multipleChoices: false,
    wordListening: false,
  });

  // builds the full list of exercises for the session
  const exercisesConfig = useMemo<ExerciseConfigValues>(() => {
    const sessionItems: Array<SessionSequenceValues> = [];
    // the user can choose how many words to train, so we cut the rest
    const limitedWords = words.slice(0, wordsCount);

    for (const exerciseKey in selectedExercises) {
      const exerciseName = exerciseKey as keyof typeof selectedExercises;

      if (!selectedExercises[exerciseName]) continue;

      const exerciseDefinition = EXERCISES_DEFINITIONS[exerciseName];
      // cut the words into groups: 1 word for most exercises, 4 for pairs
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

      // "find pairs" needs 4 words, but one word can be left alone at the end
      // if that happens, we move it into the group before it
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

    // we mix exercises inside every phase, but the phases always go 1, 2, 3
    // phase 2 is sorted so that "find pairs" (4 words) comes first
    const phase1 = shuffleArray( sessionItems.filter((item) => item.phase === 1));
    const phase2 = shuffleArray( sessionItems
      .filter((item) => item.phase === 2))
      .sort((a, b) => (b.words?.length || 0) - (a.words?.length || 0));
    const phase3 = shuffleArray( sessionItems.filter((item) => item.phase === 3));

    return {
      exerciseType,
      vocabularyWords: [...words],
      selectedExercises,
      wordsCount,
      isReady: true,
      // how many exercise types are chosen, used to split the score
      multiplier: Object.values(selectedExercises).filter(Boolean).length,
      sessionWords: limitedWords,
      sessionSequence: [...phase1, ...phase2, ...phase3],
    };
  }, [words, wordsCount, selectedExercises, exerciseType]);


  return {
    exercisesConfig,
    wordsCount,
    setWordsCount,
    selectedExercises,
    setSelectedExercises,
    isExerciseSelectionEmpty,
    setIsExerciseSelectionEmpty,
  };
}

export default useExercisesSettings;
