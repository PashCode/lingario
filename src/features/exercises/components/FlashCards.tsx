import { useAppSelector } from "@/app/store";
import {
  selectInProgressWords,
  selectNewWords,
} from "@/features/exercises/slice";
import { useState } from "react";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import usePronounceText from "@/shared/hooks/usePronounceText";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes/paths";

function FlashCards() {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const location = useLocation();
  const newWords = useAppSelector(selectNewWords);
  const repeatWords = useAppSelector(selectInProgressWords);

  function wordsType() {
    switch (location?.state?.exerciseType) {
      case "new-words":
        return newWords;
      case "repeat-words":
        return repeatWords;
      default:
        return newWords;
    }
  }
  const words = wordsType();

  if (currentIndex < words.length) {
    return isFrontSide ? (
      <div
        key={words[currentIndex].id}
        className="front-side border-2"
        onClick={() => setIsFrontSide(false)}
      >
        <div className="flex h-150 w-100 flex-col items-center justify-center bg-gray-500">
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
        <div className="flex h-150 w-100 flex-col items-center justify-center bg-gray-500">
          <h1>{words[currentIndex].translation}</h1>
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
          <span>
            <HiArrowPathRoundedSquare />
          </span>
        </div>
      </div>
    );
  } else {
    return <Navigate to={ROUTES.EXERCISES.ROOT}/>
  }
}

export default FlashCards;
