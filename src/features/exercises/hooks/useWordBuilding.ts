import { useMemo, useState } from "react";
import { calcMistakes, shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";
import { ANSWER_ANIMATION_DELAY } from "@/features/exercises/utils/constants";

function useWordBuilding({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const [mistakesCount, setMistakesCount] = useState(0);
  const [collectedLetters, setCollectedLetters] = useState<Array<string>>([]);
  const [guessedIndexes, setGuessedIndexes] = useState<Array<number>>([]);
  const [notGuessedIndex, setNotGuessedIndex] = useState<number | null>(null);

  const shuffledLetters = useMemo(() => {
    const splitToLetters = currentWord.englishWord.split("");
    return shuffleArray(splitToLetters);
  }, [currentWord.englishWord]);

  function handleLetterClick(clickedLetter: string, clickedIndex: number) {
    const expectedLetter = currentWord.englishWord[collectedLetters.length];

    if (clickedLetter === expectedLetter) {
      const currentCollectedLetters = [...collectedLetters, clickedLetter];
      setGuessedIndexes([...guessedIndexes, clickedIndex]);
      setCollectedLetters(currentCollectedLetters);

      if (currentCollectedLetters.length === currentWord.englishWord.length) {
        setTimeout(() => {
          changeScore({ resultType: calcMistakes(mistakesCount) });
          setCollectedLetters([]);
          setGuessedIndexes([]);
          setMistakesCount(0);
          setCurrentIndex((prev) => prev + 1);
        }, ANSWER_ANIMATION_DELAY);
      }
    } else {
      setMistakesCount((prevState) => prevState + 1);
      setNotGuessedIndex(clickedIndex);
      setTimeout(() => {
        setNotGuessedIndex(null);
      }, ANSWER_ANIMATION_DELAY);
    }
  }

  return {
    currentWord,
    collectedLetters,
    shuffledLetters,
    handleLetterClick,
    guessedIndexes,
    notGuessedIndex,
  };
}

export default useWordBuilding;
