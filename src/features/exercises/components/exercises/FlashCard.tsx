import { useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import usePronounceText from "@/shared/hooks/usePronounceText";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import { changeWordScore } from "@/features/exercises/services";
import type { ExerciseProps } from "@/features/exercises/types";

function FlashCard({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
}: ExerciseProps) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const [isFrontSide, setIsFrontSide] = useState(true);
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const currentPhrase =
    exercisesConfig.sessionSequence[currentIndex].word.phrase;

  const [btnClickedColor, setBtnClickedColor] = useState("");

  return isFrontSide ? (
    <div
      key={currentWord.id}
      className="front-side border-2"
      onClick={() => setIsFrontSide(false)}
    >
      <div className="flex h-150 w-120 flex-col items-center justify-center bg-gray-500 select-none">
        <div className="flex gap-2">
          <h1>{currentWord.englishWord}</h1>

          <Button
            text={
              <PronounceButton
                size="20"
                currentPronounce={currentPronounce}
                text={currentWord.englishWord.replaceAll("*", "")}
              />
            }
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              void pronounceText(
                currentWord.englishWord.replaceAll("*", ""),
                exercisesConfig.voiceSettings.voice,
                exercisesConfig.voiceSettings.gender,
              );
            }}
            disabled={isPlaying}
          />
        </div>

        <div className="flex gap-2">
          <h1>{currentPhrase.replaceAll("*", "")}</h1>

          <Button
            text={
              <PronounceButton
                size="20"
                currentPronounce={currentPronounce}
                text={currentPhrase.replaceAll("*", "")}
              />
            }
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              void pronounceText(
                currentPhrase.replaceAll("*", ""),
                exercisesConfig.voiceSettings.voice,
                exercisesConfig.voiceSettings.gender,
              );
            }}
            disabled={isPlaying}
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
        <h1>{currentWord.translation}</h1>
        <div className="flex gap-2">
          <Button
            text="Знаю"
            onClick={(event) => {
              event.stopPropagation();
              setBtnClickedColor("know");
              void changeWordScore(currentWord, "increase");

              setTimeout(() => {
                setBtnClickedColor("");
                setIsFrontSide(true);
                setCurrentIndex((prevState) => prevState + 1);
              }, 250);
            }}
            className={`cursor-pointer border p-0.5 ${btnClickedColor === "know" ? "bg-green-500" : null}`}
          />
          <Button
            text="Не знаю"
            onClick={(event) => {
              event.stopPropagation();
              setBtnClickedColor("dontKnow");
              void changeWordScore(currentWord, "decrease");

              setTimeout(() => {
                setBtnClickedColor("");
                setIsFrontSide(true);
                setCurrentIndex((prevState) => prevState + 1);
              }, 250);
            }}
            className={`cursor-pointer border p-0.5 ${btnClickedColor === "dontKnow" ? "bg-red-500" : null}`}
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
