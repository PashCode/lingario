import PronounceButton from "@/shared/components/ui/PronounceButton";
import Button from "@/shared/components/ui/Button";
import type { ExerciseProps } from "@/features/exercises/types";
import useWordMatching from "@/features/exercises/hooks/useWordMatching";

function WordMatching({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const currentWord = exercisesConfig.sessionSequence[currentIndex].word;
  const currentPhrase = exercisesConfig.sessionSequence[currentIndex].word.phrase;
  const {
    shuffledWords,
    clickedButton,
    handleAnswerResult
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
          <h1>{currentPhrase.replaceAll("*", "")}</h1>
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

          let buttonColorClass = "";
          if (isClicked) {
            buttonColorClass = isCorrect ? "bg-green-500" : "bg-red-500";
          }

          return (
            <Button
              key={word.id}
              text={word.translation}
              className={`w-40 cursor-pointer border ${buttonColorClass}`}
              onClick={() => handleAnswerResult(isCorrect, word.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WordMatching;
