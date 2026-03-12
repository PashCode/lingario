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
            setSelectedExercises((prev) => {
              return {
                ...prev,
                flashCard: !prev.flashCard,
              };
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
            setSelectedExercises((prev) => {
              return {
                ...prev,
                wordMatching: !prev.wordMatching,
              };
            })
          }
        />
      </form>
    </div>
  );
}

export default ExercisesType;
