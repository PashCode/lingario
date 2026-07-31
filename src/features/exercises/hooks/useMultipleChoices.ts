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
  // true for a moment after the second click, so the user can't click more
  const [isCheckingMatch, setIsCheckingMatch] = useState(false);
  // here 4 words are trained at once, so every word counts its own mistakes
  const [mistakesMap, setMistakesMap] = useState<Record<string, number>>({});
  const [matchedWordIds, setMatchedWordIds] = useState<string[]>([]);

  // two columns with the same words, but mixed differently
  const { shuffledEnglish, shuffledTranslations } = useMemo(() => {
    return {
      shuffledEnglish: shuffleArray([...sessionWords]),
      shuffledTranslations: shuffleArray([...sessionWords]),
    };
  }, [sessionWords]);

  function resetSelection() {
    setSelectedEng("");
    setSelectedTr("");
    setIsCheckingMatch(false);
  }

  function handleCorrectMatch(wordIdFromEnglishColumn: string) {
    if (matchedWordIds.includes(wordIdFromEnglishColumn)) return;

    const currentMatchedWords = [...matchedWordIds, wordIdFromEnglishColumn];
    setMatchedWordIds(currentMatchedWords);

    const targetWord = sessionWords.find(
      (w) => w.id === wordIdFromEnglishColumn,
    );
    const wordMistakes = mistakesMap[wordIdFromEnglishColumn] || 0;

    // we pass targetWord, because the score is for this pair,
    // not for the word that the session is currently on
    if (targetWord) {
      changeScore({
        resultType: calcMistakes(wordMistakes),
        targetWord,
      });
    }

    setTimeout(() => {
      resetSelection();

      // go to the next exercise only when all 4 pairs are found
      if (currentMatchedWords.length === sessionWords.length) {
        Howler.stop();
        setCurrentIndex((prev) => prev + 1);
        setMistakesMap({});
        setMatchedWordIds([]);
      }
    }, 250);
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

    // clicking the same word again just unselects it
    if (currentSelected === wordId) {
      setSelectedWord("");
      return;
    }
    setSelectedWord(wordId);

    // we check the pair only when one word from each column is selected
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
