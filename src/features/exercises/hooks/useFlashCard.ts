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
  const word = exercisesConfig.sessionSequence[currentIndex].word;
  const { PERFECT, FAILED } = ANSWER_RESULTS;

  function handleButtonClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    buttonType: "know" | "dontKnow",
  ) {
    // the whole card flips on click, so stop the click here
    // otherwise pressing a button would also flip the card
    event.stopPropagation();
    setClickedButton(buttonType);

    // here there are no mistakes to count — the user says "know" or "don't know"
    setTimeout(() => {
      // stop the audio, so it does not play over the next exercise
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
    word
  };
}

export default useFlashCard;
