import usePronounceText from "@/shared/hooks/usePronounceText";
import Button from "@/shared/components/ui/Button";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import type { ExerciseProps } from "@/features/exercises/types";
import { useEffect, useMemo, useState } from "react";
import { calcMistakes, shuffleArray } from "@/features/exercises/utils/helpers";

function WordListening({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const [clickedButton, setClickedButton] = useState("");
  const [mistakesCount, setMistakesCount] = useState(0);

  useEffect(() => {
    void pronounceText(
      currentWord.englishWord.replaceAll("*", ""),
      exercisesConfig.voiceSetting.voice,
      exercisesConfig.voiceSetting.gender,
    );
  }, [currentIndex]);

  const shuffledWords = useMemo(() => {
    const incorrectWords = exercisesConfig.sessionWords.filter(
      ({ englishWord }: { englishWord: string }) => {
        return englishWord !== currentWord.englishWord;
      },
    );

    const correctWords = [
      ...shuffleArray(incorrectWords).slice(0, 3),
      currentWord,
    ];

    return shuffleArray(correctWords);
  }, [currentWord, exercisesConfig.sessionWords]);

  return (
    <div className="flex h-150 w-120 flex-col items-center justify-around bg-gray-500">
      <div className="flex justify-center gap-2">
        <Button
          text={
            <PronounceButton
              size="40"
              currentPronounce={currentPronounce}
              text={currentWord.englishWord.replaceAll("*", "")}
            />
          }
          className="cursor-pointer"
          disabled={isPlaying}
          onClick={() => {
            void pronounceText(
              currentWord.englishWord.replaceAll("*", ""),
              exercisesConfig.voiceSetting.voice,
              exercisesConfig.voiceSetting.gender,
            );
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center border-2 p-6">
        {shuffledWords.map((word) => {
          const isCorrect = word.englishWord === currentWord.englishWord;
          const isClicked = clickedButton === word.englishWord;

          let buttonColorClass = "";
          if (isClicked) {
            buttonColorClass = isCorrect ? "bg-green-500" : "bg-red-500";
          }

          return (
            <Button
              key={word.id}
              text={word.translation}
              className={`w-40 cursor-pointer border ${buttonColorClass}`}
              onClick={() => {
                setClickedButton(word.englishWord);

                if (isCorrect) {
                  setTimeout(() => {
                    changeScore({ resultType: calcMistakes(mistakesCount) });
                    setCurrentIndex((prevState) => prevState + 1);
                    setClickedButton("");
                  }, 250);
                  setMistakesCount(0);
                } else {
                  setMistakesCount((prevState) => prevState + 1);
                  setTimeout(() => setClickedButton(""), 250);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WordListening;
