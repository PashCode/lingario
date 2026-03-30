import Button from "@/shared/components/ui/Button";
import type { SelectionControlsProps } from "@/features/exercises/types";

function SelectionControls({
  setSelectedExercises,
  setIsExerciseSelectionEmpty,
}: SelectionControlsProps) {
  return (
    <div className="flex gap-2 border-2 border-green-800">
      <Button
        text="Обрати все"
        className="cursor-pointer border-2"
        onClick={() => {
          setIsExerciseSelectionEmpty(false);
          setSelectedExercises({
            flashCard: true,
            wordMatching: true,
            wordBuilding: true,
            wordListening: true,
            multipleChoices: true,
          });
        }}
      ></Button>

      <Button
        text="Очистити вибір"
        className="cursor-pointer border-2"
        onClick={() =>
          setSelectedExercises({
            flashCard: false,
            wordMatching: false,
            wordBuilding: false,
            wordListening: false,
            multipleChoices: false,
          })
        }
      ></Button>
    </div>
  );
}

export default SelectionControls;
