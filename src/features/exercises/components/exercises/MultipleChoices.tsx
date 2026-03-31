import type { ExerciseProps } from "@/features/exercises/types";
import Button from "@/shared/components/ui/Button";
import useMultipleChoices from "@/features/exercises/hooks/useMultipleChoices";
import type { WordColumnProps } from "@/features/exercises/types";

function WordColumn({
  items,
  type,
  selectedValue,
  matchedWordIds,
  isCheckingMatch,
  selectedEng,
  selectedTr,
  handleWordClick,
}: WordColumnProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border-2 p-6">
      {items.map((word) => {
        const isMatched = matchedWordIds.includes(word.id);
        const isSelected = selectedValue === word.id;
        const isCorrect = isCheckingMatch && isSelected && selectedEng === selectedTr;
        const isWrong = isCheckingMatch && isSelected && selectedEng !== selectedTr;

        let buttonColorClass = "";
        if (isMatched) {
          buttonColorClass = "bg-green-500 opacity-50 cursor-not-allowed";
        } else if (isCorrect) {
          buttonColorClass = "bg-green-500";
        } else if (isWrong) {
          buttonColorClass = "bg-red-500";
        } else if (isSelected) {
          buttonColorClass = "bg-slate-400";
        }

        const displayText =
          type === "englishWords"
            ? word.englishWord
            : word.translation;

        return (
          <Button
            key={`${type}-${word.id}`}
            text={displayText}
            className={`w-40 cursor-pointer border ${buttonColorClass}`}
            disabled={isMatched}
            onClick={() => handleWordClick(word.id, type)}
          />
        );
      })}
    </div>
  );
}

function MultipleChoices({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const {
    handleWordClick,
    shuffledEnglish,
    shuffledTranslations,
    isCheckingMatch,
    matchedWordIds,
    selectedEng,
    selectedTr,
  } = useMultipleChoices({
    exercisesConfig,
    currentIndex,
    setCurrentIndex,
    changeScore,
  });

  return (
    <div className="flex h-150 w-120 flex-col items-center justify-around bg-gray-500">
      <div className="flex w-full justify-around px-4">
        <WordColumn
          items={shuffledEnglish}
          type="englishWords"
          selectedValue={selectedEng}
          matchedWordIds={matchedWordIds}
          isCheckingMatch={isCheckingMatch}
          selectedEng={selectedEng}
          selectedTr={selectedTr}
          handleWordClick={handleWordClick}
        />

        <WordColumn
          items={shuffledTranslations}
          type="translations"
          selectedValue={selectedTr}
          matchedWordIds={matchedWordIds}
          isCheckingMatch={isCheckingMatch}
          selectedEng={selectedEng}
          selectedTr={selectedTr}
          handleWordClick={handleWordClick}
        />
      </div>
    </div>
  );
}

export default MultipleChoices;
