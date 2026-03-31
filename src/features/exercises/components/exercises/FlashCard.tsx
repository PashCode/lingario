import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { ExerciseProps } from "@/features/exercises/types";
import useFlashCard from "@/features/exercises/hooks/useFlashCard";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";

function FlashCard({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {

  const {
    handleButtonClick,
    setIsFrontSide,
    isFrontSide,
    clickedButton,
    englishWord,
    translation,
    sentence,
  } = useFlashCard({
    exercisesConfig,
    currentIndex,
    setCurrentIndex,
    changeScore,
  });

  return isFrontSide ? (
    <div className="front-side border-2" onClick={() => setIsFrontSide(false)}>
      <div className="flex h-150 w-120 flex-col items-center justify-center bg-gray-500 select-none">
        <div className="flex gap-2">
          <h1>{englishWord}</h1>
          <PronounceButton
            size="20"
            text={englishWord}
            gender={exercisesConfig.voiceSetting.gender}
            voice={exercisesConfig.voiceSetting.voice}
          />
        </div>

        <div className="flex gap-2">
          <h1>{sentence}</h1>
          <PronounceButton
            size="20"
            text={sentence}
            gender={exercisesConfig.voiceSetting.gender}
            voice={exercisesConfig.voiceSetting.voice}
          />
        </div>

        <span>
          <HiArrowPathRoundedSquare />
        </span>
      </div>
    </div>
  ) : (
    <div className="back-side border-2" onClick={() => setIsFrontSide(true)}>
      <div className="flex h-150 w-100 flex-col items-center justify-center bg-gray-500 select-none">
        <h1>{translation}</h1>
        <div className="flex gap-2">
          <Button
            text="Знаю"
            onClick={(event) => handleButtonClick(event, "know")}
            className={`cursor-pointer border p-0.5 ${clickedButton === "know" ? ANSWER_COLORS.CORRECT : ""}`}
          />
          <Button
            text="Не знаю"
            onClick={(event) => handleButtonClick(event, "dontKnow")}
            className={`cursor-pointer border p-0.5 ${clickedButton === "dontKnow" ? ANSWER_COLORS.WRONG : ""}`}
          />
        </div>
        <span>
          <HiArrowPathRoundedSquare />
        </span>
      </div>
    </div>
  );
}

export default FlashCard;
