import Input from "@/shared/components/ui/Input";
import type { ExercisesTypeProps } from "@/features/exercises/types";

function ExercisesType({
  selectedExercises,
  setSelectedExercises,
  showError,
  setShowError,
}: ExercisesTypeProps) {
  return (
    <div>
      {showError && <h1>Оберіть вправи</h1>}
      <form
        className={
          showError
            ? "animate-pulse border-5 border-red-800 p-3"
            : "border-2 p-3"
        }
      >
        <Input
          className="border"
          name="flashCards"
          id="flashCards"
          htmlFor="flashCards"
          labelText="Флеш картки"
          type="checkbox"
          checked={selectedExercises.flashCard}
          onChange={() => {
            setShowError(false);
            setSelectedExercises((prev) => {
              return {
                ...prev,
                flashCard: !prev.flashCard,
              };
            });
          }}
        />
        <Input
          className="border"
          name="wordsMatching"
          id="wordsMatching"
          htmlFor="wordsMatching"
          labelText="Обрати слово"
          type="checkbox"
          checked={selectedExercises.wordMatching}
          onChange={() => {
            setShowError(false);
            setSelectedExercises((prev) => {
              return {
                ...prev,
                wordMatching: !prev.wordMatching,
              };
            });
          }}
        />
      </form>
    </div>
  );
}

export default ExercisesType;
