import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { ExerciseProps } from "@/features/exercises/types";
import useWordMatching from "@/features/exercises/hooks/useWordMatching";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";

function WordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {

  const {
    shuffledWords,
    clickedButton,
    currentWord,
    currentPhrase,
    handleAnswerResult,
  } = useWordMatching({
    exercisesConfig,
    currentIndex,
    setCurrentIndex,
    changeScore,
  });

  return (
    <div className="flex h-150 w-120 flex-col items-center justify-around bg-gray-500">
      <div className="flex flex-col gap-2 border-2 p-6">
        <div className="flex justify-center gap-2">
          <h1>{currentWord.englishWord}</h1>
          <PronounceButton
            size="20"
            text={currentWord.englishWord}
            gender={exercisesConfig.voiceSetting.gender}
            voice={exercisesConfig.voiceSetting.voice}
          />
        </div>

        <div className="flex justify-center gap-2">
          <h1>{currentPhrase}</h1>
          <PronounceButton
            size="20"
            text={currentPhrase}
            gender={exercisesConfig.voiceSetting.gender}
            voice={exercisesConfig.voiceSetting.voice}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center border-2 p-6">
        {shuffledWords.map((word) => {
          const isCorrect = word.id === currentWord.id;
          const isClicked = clickedButton === word.id;

          let buttonClass = "";
          if (isClicked) {
            buttonClass = isCorrect
              ? ANSWER_COLORS.CORRECT
              : ANSWER_COLORS.WRONG;
          }

          return (
            <Button
              key={word.id}
              text={word.translation}
              disabled={!!clickedButton}
              className={`w-40 cursor-pointer border ${buttonClass}`}
              onClick={() => handleAnswerResult(isCorrect, word.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WordMatching;
