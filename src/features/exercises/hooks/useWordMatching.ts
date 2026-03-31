import { useMemo, useState } from "react";
import { Howler } from "howler";
import { calcMistakes, shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";

function useWordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const [clickedButton, setClickedButton] = useState("");
  const [mistakesCount, setMistakesCount] = useState(0);

  const shuffledWords = useMemo(() => {
    const incorrectWords = exercisesConfig.sessionWords.filter(
      ({ id }: { id: string }) => {
        return id !== currentWord.id;
      },
    );

    const correctWords = [
      ...shuffleArray(incorrectWords).slice(0, 3),
      currentWord,
    ];

    return shuffleArray(correctWords);
  }, [currentWord, exercisesConfig.sessionWords]);

  function handleAnswerResult(isCorrect: boolean, id: string) {
    setClickedButton(id);

    if (isCorrect) {
      setTimeout(() => {
        Howler.stop();
        changeScore({ resultType: calcMistakes(mistakesCount) });
        setCurrentIndex((prevState) => prevState + 1);
        setClickedButton("");
      }, 250);
      setMistakesCount(0);
    } else {
      setMistakesCount((prevState) => prevState + 1);
      setTimeout(() => setClickedButton(""), 250);
    }
  }

  return {
    shuffledWords,
    clickedButton,
    handleAnswerResult,
  };
}

export default useWordMatching;