import type { ExerciseProps } from "@/features/exercises/types";
import usePronounceText from "@/shared/hooks/usePronounceText";
import { useMemo, useState } from "react";
import { shuffleArray } from "@/features/exercises/utils/helpers";

function MultipleChoices({
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
      <div>
        <h1>{currentWord.englishWord}</h1>
      </div>
    </div>
  );
}

export default MultipleChoices;