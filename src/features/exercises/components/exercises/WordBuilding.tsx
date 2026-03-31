import type { ExerciseProps } from "@/features/exercises/types";
import Button from "@/shared/components/ui/Button";
import useWordBuilding from "@/features/exercises/hooks/useWordBuilding";

function WordBuilding( {
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const {
    currentWord,
    collectedLetters,
    availableLetters,
    compareLetters,
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
            const isCollected = index < collectedLetters.length;

            return (
              <div
                key={letter + index}
                className={`w-10 border-b-4 text-center ${isCollected ? "border-green-500" : "border-gray-400"}`}
              >
                {isCollected ? letter : ""}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          {availableLetters.map((letter, index) => {
            return (
              <Button
                key={letter + index}
                text={letter}
                className="cursor-pointer border p-3"
                onClick={compareLetters}
              ></Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WordBuilding;
