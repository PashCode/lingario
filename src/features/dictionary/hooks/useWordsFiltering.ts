import type {
  Oxford3000Values,
  sortWordProgress,
  sortWordsLevel,
  sortWordsOrder,
} from "@/features/dictionary/types";
import { useMemo, useState } from "react";

function useWordsFiltering(dictionary: Array<Oxford3000Values>) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortOrder, setSortOrder] = useState<sortWordsOrder>(null);
  const [sortLevel, setSortLevel] = useState<sortWordsLevel>(null);
  const [sortProgress, setSortProgress] = useState<sortWordProgress>(null);

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
    isSearchOpen,
    setIsSearchOpen,
    sortOrder,
    setSortOrder,
    sortLevel,
    setSortLevel,
    sortProgress,
    setSortProgress,
  };
}

export default useWordsFiltering;
