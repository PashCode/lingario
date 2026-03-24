import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import usePronounceText from "@/shared/hooks/usePronounceText";
import { useMemo, useState } from "react";
import { shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";
import { calcMistakes } from "@/features/exercises/utils/helpers";

function WordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const currentPhrase = exercisesConfig.sessionSequence[currentIndex].word.phrase;
  const [clickedButton, setClickedButton] = useState("");
  const [mistakesCount, setMistakesCount] = useState(0);

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
      <div className="flex flex-col gap-2 border-2 p-6">
        <div className="flex justify-center gap-2">
          <h1>{currentWord.englishWord}</h1>
          <Button
            text={
              <PronounceButton
                size="20"
                currentPronounce={currentPronounce}
                text={exercisesConfig.sessionSequence[
                  currentIndex
                ].word.englishWord.replaceAll("*", "")}
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

        <div className="flex justify-center gap-2">
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

export default WordMatching;
