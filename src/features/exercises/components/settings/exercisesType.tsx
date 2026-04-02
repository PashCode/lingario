import Input from "@/shared/components/ui/Input";
import type { ExercisesTypeProps } from "@/features/exercises/types";

function ExercisesType({
  selectedExercises,
  setSelectedExercises,
  isExerciseSelectionEmpty,
  setIsExerciseSelectionEmpty,
}: ExercisesTypeProps) {

  const EXERCISES_TYPES = [
    { key: "flashCard", label: "Флеш картки" },
    { key: "wordMatching", label: "Обрати слово" },
    { key: "wordBuilding", label: "Зібрати слово" },
    { key: "multipleChoices", label: "Знайти пари" },
    { key: "wordListening", label: "Прослухати і обрати слово" },
  ] as const;

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
        {EXERCISES_TYPES.map(({ key, label }) => {
          return (
            <Input
              key={key}
              className="border"
              name={key}
              id={key}
              htmlFor={key}
              labelText={label}
              type="checkbox"
              checked={selectedExercises[key]}
              onChange={() => {
                setIsExerciseSelectionEmpty(false);
                setSelectedExercises((prevState) => ({
                  ...prevState,
                  [key]: !prevState[key],
                }));
              }}
            />
          );
        })}
      </form>
    </div>
  );
}

export default ExercisesType;
