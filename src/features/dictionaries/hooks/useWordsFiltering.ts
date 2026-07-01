import type {
  Oxford3000Values,
  SortWordProgress,
  SortWordsLevel,
  SortWordsOrder,
} from "@/features/dictionaries/types";
import { useMemo, useState } from "react";

function useWordsFiltering(dictionary: Array<Oxford3000Values>) {
  const [searchWord, setSearchWord] = useState("");
  const [sortOrder, setSortOrder] = useState<SortWordsOrder>(null);
  const [sortLevel, setSortLevel] = useState<SortWordsLevel>(null);
  const [sortProgress, setSortProgress] = useState<SortWordProgress>(null);

  const filteredWords = useMemo(() => {
    return dictionary
      .filter((word) => {
        return (
          (sortLevel === word.level || sortLevel === null) &&
          (sortProgress === word.progress || sortProgress === null) &&
          word.englishWord
            .toLowerCase()
            .trim()
            .includes(searchWord.toLowerCase().trim())
        );
      })
      .sort((a, b) => {
        if (sortOrder === "asc" || sortOrder === null)
          return a.englishWord.localeCompare(b.englishWord);
        return b.englishWord.localeCompare(a.englishWord);
      });
  }, [dictionary, sortLevel, sortOrder, searchWord, sortProgress]);

  function resetAllFilters() {
    setSearchWord("");
    setSortLevel(null);
    setSortOrder(null);
    setSortProgress(null);
  }

  return {
    filteredWords,
    resetAllFilters,
    searchWord,
    setSearchWord,
    sortOrder,
    setSortOrder,
    sortLevel,
    setSortLevel,
    sortProgress,
    setSortProgress,
  };
}

export default useWordsFiltering;
