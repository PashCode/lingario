import { useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import usePronounceText from "@/shared/hooks/usePronounceText";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import { changeWordScore } from "@/features/exercises/services";

function FlashCard({
  exerciseData,
  voice,
  gender,
  currentIndex,
  setCurrentIndex,
}: any) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const [isFrontSide, setIsFrontSide] = useState(true);

  return isFrontSide ? (
    <div
      key={exerciseData[currentIndex].word.id}
      className="front-side border-2"
      onClick={() => setIsFrontSide(false)}
    >
      <div className="flex h-150 w-100 flex-col items-center justify-center bg-gray-500 select-none">
        <Button
          text={
            <PronounceButton
              size="20"
              currentPronounce={currentPronounce}
              text={exerciseData[currentIndex].word.englishWord.replaceAll(
                "*",
                "",
              )}
            />
          }
          className="cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            void pronounceText(
              exerciseData[currentIndex].word.englishWord.replaceAll("*", ""),
              voice,
              gender,
            );
          }}
          disabled={isPlaying}
        />
        <h1>{exerciseData[currentIndex].word.englishWord}</h1>
        <h1>{exerciseData[currentIndex].word.phrase.replaceAll("*", "")}</h1>
        <span>
          <HiArrowPathRoundedSquare />
        </span>
      </div>
    </div>
  ) : (
    <div className="back-side border-2" onClick={() => setIsFrontSide(true)}>
      <div className="flex h-150 w-100 flex-col items-center justify-center bg-gray-500 select-none">
        <h1>{exerciseData[currentIndex].word.translation}</h1>
        <div>
          <Button
            text="Знаю"
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex((prevState) => prevState + 1);
              setIsFrontSide(true);
              void changeWordScore(exerciseData[currentIndex].word, "increase");
            }}
            className="cursor-pointer"
          />
          <Button
            text="Не знаю"
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex((prevState) => prevState + 1);
              setIsFrontSide(true);
              void changeWordScore(exerciseData[currentIndex].word, "decrease");
            }}
            className="cursor-pointer"
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
