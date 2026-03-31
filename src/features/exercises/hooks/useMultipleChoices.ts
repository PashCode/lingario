import type { ExerciseProps } from "@/features/exercises/types";
import { useMemo, useState } from "react";
import { Howler } from "howler";
import { shuffleArray, calcMistakes } from "@/features/exercises/utils/helpers";

function useMultipleChoices({
  exercisesConfig,
  currentIndex,
  setCurrentIndex,
  changeScore,
}: ExerciseProps) {
  const sessionWords = exercisesConfig.sessionSequence[currentIndex].words!;

  const [selectedEng, setSelectedEng] = useState("");
  const [selectedTr, setSelectedTr] = useState("");
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  const [mistakesMap, setMistakesMap] = useState<Record<string, number>>({});
  const [matchedWordIds, setMatchedWordIds] = useState<string[]>([]);

  const { shuffledEnglish, shuffledTranslations } = useMemo(() => {
    return {
      shuffledEnglish: shuffleArray([...sessionWords]),
      shuffledTranslations: shuffleArray([...sessionWords]),
    };
  }, [sessionWords]);

  const resetSelection = () => {
    setSelectedEng("");
    setSelectedTr("");
    setIsCheckingMatch(false);
  };

  function handleCorrectMatch(wordIdFromEnglishColumn: string) {
    const newMatchedWords = [...matchedWordIds, wordIdFromEnglishColumn];
    setMatchedWordIds(newMatchedWords);
    resetSelection();

    const targetWord = sessionWords.find(
      (w) => w.id === wordIdFromEnglishColumn,
    );
    const wordMistakes = mistakesMap[wordIdFromEnglishColumn] || 0;

    if (targetWord) {
      changeScore({
        resultType: calcMistakes(wordMistakes),
        targetWord,
      });
    }

    if (newMatchedWords.length === sessionWords.length) {
      setTimeout(() => {
        Howler.stop();
        setCurrentIndex((prev) => prev + 1);
        setMistakesMap({});
        setMatchedWordIds([]);
      }, 250);
    }
  }

  function handleWrongMatch(wordIdFromEnglishColumn: string) {
    setMistakesMap((prev) => ({
      ...prev,
      [wordIdFromEnglishColumn]: (prev[wordIdFromEnglishColumn] || 0) + 1,
    }));

    setTimeout(() => {
      resetSelection();
    }, 250);
  }

  function checkMatch(
    wordIdFromEnglishColumn: string,
    wordIdFromTranslationColumn: string,
  ) {
    setIsCheckingMatch(true);

    if (wordIdFromEnglishColumn === wordIdFromTranslationColumn) {
      handleCorrectMatch(wordIdFromEnglishColumn);
    } else {
      handleWrongMatch(wordIdFromEnglishColumn);
    }
  }

  function handleWordClick(
    wordId: string,
    column: "englishWords" | "translations",
  ) {
    if (isCheckingMatch || matchedWordIds.includes(wordId)) return;

    const isEng = column === "englishWords";
    const currentSelected = isEng ? selectedEng : selectedTr;
    const oppositeSelected = isEng ? selectedTr : selectedEng;
    const setSelectedWord = isEng ? setSelectedEng : setSelectedTr;

    if (currentSelected === wordId) {
      setSelectedWord("");
      return;
    } else {
      setSelectedWord(wordId);
    }

    if (oppositeSelected) {
      const wordIdFromEnglishColumn = isEng ? wordId : oppositeSelected;
      const wordIdFromTranslationColumn = isEng ? oppositeSelected : wordId;
      checkMatch(wordIdFromEnglishColumn, wordIdFromTranslationColumn);
    }
  }

  return {
    handleWordClick,
    shuffledEnglish,
    shuffledTranslations,
    selectedEng,
    selectedTr,
    isCheckingMatch,
    mistakesMap,
    matchedWordIds,
  };
}

export default useMultipleChoices;
