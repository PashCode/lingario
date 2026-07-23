import { useMemo, useState } from "react";
import { Howler } from "howler";
import { calcMistakes, shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";
import { ANSWER_ANIMATION_DELAY } from "@/features/exercises/utils/constants";

function useWordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const word = exercisesConfig.sessionSequence[currentIndex].word;
  const [clickedButton, setClickedButton] = useState("");
  const [mistakesCount, setMistakesCount] = useState(0);

  // makes 4 answer options: 3 wrong words from this session + the right one
  const shuffledWords = useMemo(() => {
    const incorrectWords = exercisesConfig.sessionWords.filter(
      ({ id }: { id: string }) => id !== word.id,
    );

    const answerOptions = [...shuffleArray(incorrectWords).slice(0, 3), word];

    return shuffleArray(answerOptions);
  }, [word, exercisesConfig.sessionWords]);

  function handleAnswerResult(isCorrect: boolean, id: string) {
    setClickedButton(id);

    if (isCorrect) {
      setTimeout(() => {
        Howler.stop();
        changeScore({ resultType: calcMistakes(mistakesCount) });
        setCurrentIndex((prevState) => prevState + 1);
        setClickedButton("");
        setMistakesCount(0);
      }, ANSWER_ANIMATION_DELAY);
    } else {
      // wrong answer does not move us forward, the user tries again
      setMistakesCount((prevState) => prevState + 1);
      setTimeout(() => setClickedButton(""), ANSWER_ANIMATION_DELAY);
    }
  }

  return {
    shuffledWords,
    clickedButton,
    word,
    handleAnswerResult,
  };
}

export default useWordMatching;
