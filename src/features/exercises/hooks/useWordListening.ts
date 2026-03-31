import { useMemo, useState } from "react";
import { Howler } from "howler";
import { calcMistakes, shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";
import { ANSWER_ANIMATION_DELAY } from "@/features/exercises/utils/constants";

function useWordListening({
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
      ({ id }: { id: string }) => id !== currentWord.id,
    );

    const answerOptions = [
      ...shuffleArray(incorrectWords).slice(0, 3),
      currentWord,
    ];

    return shuffleArray(answerOptions);
  }, [exercisesConfig.sessionWords, currentWord]);

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
      setMistakesCount((prevState) => prevState + 1);
      setTimeout(() => setClickedButton(""), ANSWER_ANIMATION_DELAY);
    }
  }

  return {
    shuffledWords,
    clickedButton,
    handleAnswerResult,
    currentWord,
  };
}

export default useWordListening;
