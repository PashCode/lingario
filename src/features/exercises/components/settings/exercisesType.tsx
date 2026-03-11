import Input from "@/shared/components/ui/Input";

function ExercisesType({ selectedExercises, setSelectedExercises }) {
  return (
    <div>
      <form>
        <Input
          name="flashCards"
          id="flashCards"
          htmlFor="flashCards"
          labelText="Флеш картки"
          type="checkbox"
          checked={selectedExercises.flashCard}
          onChange={() =>
            setSelectedExercises({
              ...selectedExercises,
              flashCard: !selectedExercises.flashCard,
            })
          }
        />
        <Input
          name="wordsMatching"
          id="wordsMatching"
          htmlFor="wordsMatching"
          labelText="Обрати слово"
          type="checkbox"
          checked={selectedExercises.wordMatching}
          onChange={() =>
            setSelectedExercises({
              ...selectedExercises,
              wordMatching: !selectedExercises.wordMatching,
            })
          }
        />
      </form>
    </div>
  );
}

export default ExercisesType;
