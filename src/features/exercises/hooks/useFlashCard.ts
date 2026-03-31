import * as React from "react";
import { useState } from "react";
import { Howler } from "howler";
import type { ExerciseProps } from "@/features/exercises/types";
import { ANSWER_ANIMATION_DELAY } from "@/features/exercises/utils/constants";
import { ANSWER_RESULTS } from "@/features/exercises/utils/constants";

function useFlashCard({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [clickedButton, setClickedButton] = useState<"know" | "dontKnow" | "">("");
  const englishWord = exercisesConfig.sessionSequence[currentIndex].word.englishWord;
  const translation = exercisesConfig.sessionSequence[currentIndex].word.translation;
  const sentence = exercisesConfig.sessionSequence[currentIndex].word.phrase.replaceAll("*", "");
  const { PERFECT, FAILED } = ANSWER_RESULTS;

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    buttonType: "know" | "dontKnow",
  ) {
    event.stopPropagation();
    setClickedButton(buttonType);

    setTimeout(() => {
      Howler.stop();
      setCurrentIndex((prevState) => prevState + 1);
      changeScore({ resultType: buttonType === "know" ? PERFECT : FAILED });
      setClickedButton("");
      setIsFrontSide(true);
    }, ANSWER_ANIMATION_DELAY);
  }

  return {
    handleButtonClick,
    setIsFrontSide,
    isFrontSide,
    clickedButton,
    englishWord,
    translation,
    sentence,
  };
}

export default useFlashCard;
