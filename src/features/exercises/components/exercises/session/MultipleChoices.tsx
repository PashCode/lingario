import type { ExerciseProps } from "@/features/exercises/types";
import Button from "@/shared/components/ui/Button";
import useMultipleChoices from "@/features/exercises/hooks/useMultipleChoices";
import type { WordColumnProps } from "@/features/exercises/types";
import PronounceButton from "@/shared/components/ui/PronounceButton";
import { ANSWER_COLORS } from "@/features/exercises/utils/constants";
import { LuUngroup } from "react-icons/lu";

function WordColumn({
  words,
  type,
  selectedValue,
  matchedWordIds,
  isCheckingMatch,
  selectedEng,
  selectedTr,
  handleWordClick,
}: WordColumnProps) {
  return (
    <div className="grid w-full lg:w-200 grid-rows-4 items-center gap-y-2 sm:gap-y-3 2xl:gap-y-4">
      {words.map((word) => {
        const isMatched = matchedWordIds.includes(word.id);
        const isSelected = selectedValue === word.id;
        const isWrong =
          isCheckingMatch && isSelected && selectedEng !== selectedTr;

        let buttonClass = "";
        if (isMatched) {
          buttonClass = `${ANSWER_COLORS.CORRECT} cursor-not-allowed`;
        } else if (isWrong) {
          buttonClass = `${ANSWER_COLORS.WRONG}`;
        } else if (isSelected) {
          buttonClass = "bg-blue-300";
        } else buttonClass = "border-blue-800";

        const displayText =
          type === "englishWords" ? word.englishWord : word.translation;

        return (
          <div
            key={word.id}
            className={`xs:h-10 xs:text-xl h-9 ${buttonClass} relative flex items-center rounded-[7px] border text-lg font-bold text-blue-800 sm:h-11 sm:text-[22px] md:h-12 md:text-2xl 2xl:h-14 2xl:text-3xl`}
          >
            <Button
              text={displayText}
              className={`flex w-full ${isMatched ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center`}
              disabled={isMatched || isCheckingMatch}
              onClick={() => handleWordClick(word.id, type)}
            />
            <span className="absolute right-2 flex items-center sm:right-3 2xl:right-5">
              {type === "englishWords" && (
                <PronounceButton text={displayText} size="1em" />
              )}
            </span>
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
    <div className="rounded-main-blocks shadow-main-blocks relative flex h-full w-11/12 justify-center bg-white">
      <div className="flex h-full w-full flex-col items-center p-5 select-none lg:p-8 2xl:p-10">
        <div className="flex w-full items-center justify-between">
          <p className="xs:text-lg flex items-center justify-center text-base text-gray-800 sm:text-xl md:text-2xl 2xl:text-3xl">
            Знайти пари
          </p>

          <span className="xs:h-7 xs:w-12 xs:text-lg flex h-6 w-10 items-center justify-center rounded-[7px] bg-red-100 text-sm text-red-500 sm:h-8 sm:w-13 sm:text-xl md:h-9 md:w-14 md:text-2xl 2xl:h-10 2xl:w-15 2xl:text-3xl">
            <LuUngroup size="1em" />
          </span>
        </div>

        <div className="flex w-full flex-col items-center h-full justify-center gap-y-8 sm:gap-y-12">
          <WordColumn
            words={shuffledEnglish}
            type="englishWords"
            selectedValue={selectedEng}
            matchedWordIds={matchedWordIds}
            isCheckingMatch={isCheckingMatch}
            selectedEng={selectedEng}
            selectedTr={selectedTr}
            handleWordClick={handleWordClick}
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
          />
        </div>
      </div>
    </div>
  );
}

export default MultipleChoices;
