import { useAppSelector } from "@/app/store";
import { selectNewWords } from "@/features/exercises/slice";
import { useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import usePronounceText from "@/shared/hooks/usePronounceText";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";

function FlashCards() {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const words = useAppSelector(selectNewWords);
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (currentIndex < words.length) {
    return isFrontSide ? (
      <div
        key={words[currentIndex].id}
        className="front-side border-2"
        onClick={() => setIsFrontSide(false)}
      >
        <div className="flex h-80 w-60 flex-col items-center justify-center bg-gray-500">
          <Button
            text={
              <PronounceButton
                size="20"
                currentPronounce={currentPronounce}
                text={words[currentIndex].englishWord.replaceAll("*", "")}
              />
            }
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              void pronounceText(
                words[currentIndex].englishWord.replaceAll("*", ""),
              );
            }}
            disabled={isPlaying}
          />
          <h1>{words[currentIndex].englishWord}</h1>
          <h1>{words[currentIndex].phrase.replaceAll("*", "")}</h1>
          <span>
            <HiArrowPathRoundedSquare />
          </span>
        </div>
      </div>
    ) : (
      <div className="back-side border-2" onClick={() => setIsFrontSide(true)}>
        <div className="flex h-80 w-60 flex-col items-center justify-center bg-gray-500">
          <h1>{words[currentIndex].translation}</h1>
          <span>
            <HiArrowPathRoundedSquare />
          </span>

          <div>
            <Button
              text="Знаю"
              onClick={(event) => {
                event.stopPropagation();
                setCurrentIndex((prevState) => prevState + 1);
                setIsFrontSide(true);
              }}
              className="cursor-pointer"
            />
            <Button
              text="Не знаю"
              onClick={(event) => {
                event.stopPropagation();
                setCurrentIndex((prevState) => prevState + 1);
                setIsFrontSide(true);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Тренування завершено</h1>;
  }
}

export default FlashCards;
