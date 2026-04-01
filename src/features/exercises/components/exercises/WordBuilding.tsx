import type { ExerciseProps } from "@/features/exercises/types";
import Button from "@/shared/components/ui/Button";
import useWordBuilding from "@/features/exercises/hooks/useWordBuilding";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";

function WordBuilding({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const {
    currentWord,
    collectedLetters,
    shuffledLetters,
    handleLetterClick,
    guessedIndexes,
    notGuessedIndex,
  } = useWordBuilding({
    exercisesConfig,
    currentIndex,
    setCurrentIndex,
    changeScore,
  });

  return (
    <div className="flex h-150 w-120 justify-center bg-gray-500 select-none">
      <div className="flex flex-col items-center justify-evenly">
        <h1>{currentWord.translation}</h1>

        <div className="flex gap-2 text-2xl font-bold">
          {currentWord.englishWord.split("").map((letter, index) => {
            const isLetterFound = index < collectedLetters.length;
            return (
              <div
                key={letter + index}
                className={`w-10 border-b-4 text-center ${
                  // це кольори саме бордерів, поки що я не робив константи для них, тому що скоріш за все це все зміниться при стилізації
                  isLetterFound ? "border-green-500" : "border-gray-400"
                }`}
              >
                {isLetterFound ? letter : ""}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          {shuffledLetters.map((letter, index) => {
            let buttonClass = "";
            const isCorrect = guessedIndexes.includes(index);
            const isWrong = index === notGuessedIndex;

            if (isCorrect) buttonClass = "text-transparent pointer-events-none";
            else if (isWrong) buttonClass = ANSWER_COLORS.WRONG;

            return (
              <Button
                key={letter + index}
                text={letter}
                className={`cursor-pointer border p-3 ${buttonClass}`}
                onClick={() => handleLetterClick(letter, index)}
              ></Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WordBuilding;
