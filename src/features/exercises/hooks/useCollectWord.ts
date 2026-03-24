import { useMemo, useState } from "react";
import { calcMistakes, shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";
import * as React from "react";

function useCollectWord({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const [collectedLetters, setCollectedLetters] = useState<Array<string>>([]);
  const [mistakesCount, setMistakesCount] = useState(0);

  const shuffled = useMemo(() => {
    const splitToLetters = currentWord.englishWord.split("");
    return shuffleArray(splitToLetters);
  }, [currentWord.englishWord]);

  function getAvailableLetters(shuffled: string[], collected: string[]) {
    const availableLetters = [...shuffled];

    collected.forEach((guessedLetter: string) => {
      const index = availableLetters.indexOf(guessedLetter);
      if (index !== -1) {
        availableLetters.splice(index, 1);
      }
    });

    return availableLetters;
  }
  const availableLetters = getAvailableLetters(shuffled, collectedLetters);

  function compareLetters(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    const clickedLetter = btn.innerText;
    const expectedLetter = currentWord.englishWord[collectedLetters.length];

    if (clickedLetter === expectedLetter) {
      const newCollected = [...collectedLetters, clickedLetter];
      setCollectedLetters(newCollected);

      if (newCollected.length === currentWord.englishWord.length) {
        setTimeout(() => {
          changeScore({ resultType: calcMistakes(mistakesCount) });
          setCollectedLetters([]);
          setMistakesCount(0);
          setCurrentIndex((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setMistakesCount((prevState) => prevState + 1);
      btn.classList.add("bg-red-500");
      setTimeout(() => {
        btn.classList.remove("bg-red-500");
      }, 500);
    }
  }

  return {
    currentWord,
    collectedLetters,
    availableLetters,
    compareLetters,
  };
}

export default useCollectWord;
