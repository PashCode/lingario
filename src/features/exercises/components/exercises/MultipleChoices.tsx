import type { ExerciseProps } from "@/features/exercises/types";
import Button from "@/shared/components/ui/Button";
import useMultipleChoices from "@/features/exercises/hooks/useMultipleChoices";
import type { WordColumnProps } from "@/features/exercises/types";
import PronounceButton from "@/shared/components/ui/PronounceButton";

function WordColumn({
  words,
  type,
  selectedValue,
  matchedWordIds,
  isCheckingMatch,
  selectedEng,
  selectedTr,
  handleWordClick,
  voiceSettings,
}: WordColumnProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border-2 p-6">
      {words.map((word) => {
        const isMatched = matchedWordIds.includes(word.id);
        const isSelected = selectedValue === word.id;
        const isCorrect =
          isCheckingMatch && isSelected && selectedEng === selectedTr;
        const isWrong =
          isCheckingMatch && isSelected && selectedEng !== selectedTr;

        let buttonClass = "";
        if (isMatched) {
          buttonClass = "bg-green-500 opacity-50 cursor-not-allowed";
        } else if (isCorrect) {
          buttonClass = "bg-green-500";
        } else if (isWrong) {
          buttonClass = "bg-red-500";
        } else if (isSelected) {
          buttonClass = "bg-slate-400";
        }

        const displayText =
          type === "englishWords"
          ? word.englishWord
          : word.translation;

        return (
          <div key={word.id}>
            <Button
              text={displayText}
              className={`w-40 cursor-pointer border ${buttonClass}`}
              disabled={isMatched}
              onClick={() => handleWordClick(word.id, type)}
            />
            {type === "englishWords" && (
              <PronounceButton
                text={displayText}
                size="20"
                gender={voiceSettings.gender}
                voice={voiceSettings.voice}
              />
            )}
          </div>
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
          words={shuffledEnglish}
          type="englishWords"
          selectedValue={selectedEng}
          matchedWordIds={matchedWordIds}
          isCheckingMatch={isCheckingMatch}
          selectedEng={selectedEng}
          selectedTr={selectedTr}
          handleWordClick={handleWordClick}
          voiceSettings={exercisesConfig.voiceSetting}
        />

        <WordColumn
          words={shuffledTranslations}
          type="translations"
          selectedValue={selectedTr}
          matchedWordIds={matchedWordIds}
          isCheckingMatch={isCheckingMatch}
          selectedEng={selectedEng}
          selectedTr={selectedTr}
          handleWordClick={handleWordClick}
          voiceSettings={exercisesConfig.voiceSetting}
        />
      </div>
    </div>
  );
}

export default MultipleChoices;
