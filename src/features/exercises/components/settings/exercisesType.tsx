import Input from "@/shared/components/ui/Input";
import type { ExercisesTypeProps } from "@/features/exercises/types";

function ExercisesType({
  selectedExercises,
  setSelectedExercises,
  isExerciseSelectionEmpty,
  setIsExerciseSelectionEmpty,
}: ExercisesTypeProps) {
  return (
    <div>
      {isExerciseSelectionEmpty && <h1>Оберіть вправи</h1>}
      <form
        className={
          isExerciseSelectionEmpty
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
            setIsExerciseSelectionEmpty(false);
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
            setIsExerciseSelectionEmpty(false);
            setSelectedExercises((prev) => {
              return {
                ...prev,
                wordMatching: !prev.wordMatching,
              };
            });
          }}
        />
        <Input
          className="border"
          name="collectWord"
          id="collectWord"
          htmlFor="collectWord"
          labelText="Зібрати слово"
          type="checkbox"
          checked={selectedExercises.wordBuilding}
          onChange={() => {
            setIsExerciseSelectionEmpty(false);
            setSelectedExercises((prev) => {
              return {
                ...prev,
                wordBuilding: !prev.wordBuilding,
              };
            });
          }}
        />
        <Input
          className="border"
          name="listenWord"
          id="listenWord"
          htmlFor="listenWord"
          labelText="Прослухати і обрати слово"
          type="checkbox"
          checked={selectedExercises.wordListening}
          onChange={() => {
            setIsExerciseSelectionEmpty(false);
            setSelectedExercises((prev) => {
              return {
                ...prev,
                wordListening: !prev.wordListening,
              };
            });
          }}
        />
        <Input
          className="border"
          name="multipleChoices"
          id="multipleChoices"
          htmlFor="multipleChoices"
          labelText="Знайти пари"
          type="checkbox"
          checked={selectedExercises.multipleChoices}
          onChange={() => {
            setIsExerciseSelectionEmpty(false);
            setSelectedExercises((prev) => {
              return {
                ...prev,
                multipleChoices: !prev.multipleChoices,
              };
            });
          }}
        />
      </form>
    </div>
  );
}

export default ExercisesType;
