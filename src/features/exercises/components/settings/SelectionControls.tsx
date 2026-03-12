import Button from "@/shared/components/ui/Button";

function SelectionControls({ setSelectedExercises }) {
  return (
    <div className="flex gap-2 border-2 border-green-800">
      <Button
        text="Обрати все"
        className="cursor-pointer border-2"
        onClick={() =>
          setSelectedExercises({
            flashCard: true,
            wordMatching: true,
          })
        }
      ></Button>

      <Button
        text="Очистити вибір"
        className="cursor-pointer border-2"
        onClick={() =>
          setSelectedExercises({
            flashCard: false,
            wordMatching: false,
          })
        }
      ></Button>
    </div>
  );
}

export default SelectionControls;
