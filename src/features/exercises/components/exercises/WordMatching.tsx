import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import usePronounceText from "@/shared/hooks/usePronounceText";
import { useMemo } from "react";
import { shuffleArray } from "@/features/exercises/utils/helpers";
import type { ExerciseProps } from "@/features/exercises/types";

function WordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
}: ExerciseProps) {
  const { isPlaying, currentPronounce, pronounceText } = usePronounceText();
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;

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
    <div className="flex h-150 w-100 flex-col items-center justify-around bg-gray-500">
      <div className="flex gap-2 border-2 p-6">
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

      <div className="flex flex-col items-center justify-center border-2 p-6">
        {shuffledWords.map((word) => {
          const correctWord = word.englishWord === currentWord.englishWord;

          return (
            <Button
              key={word.id}
              text={word.translation}
              className="w-40 cursor-pointer border"
              onClick={() =>
                correctWord
                  ? setCurrentIndex((prevState) => prevState + 1)
                  : null
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default WordMatching;
