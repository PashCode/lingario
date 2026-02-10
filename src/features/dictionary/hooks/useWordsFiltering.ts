import type {
  Oxford3000Values,
  sortWordsLevel,
  sortWordsOrder,
} from "@/features/dictionary/types";
import { useMemo, useState } from "react";

function useWordsFiltering(dictionary: Array<Oxford3000Values>) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortOrder, setSortOrder] = useState<sortWordsOrder>("asc");
  const [sortLevel, setSortLevel] = useState<sortWordsLevel>(null);

  const filteredWords = useMemo(() => {
    return dictionary
      .filter((word) => {
        return word.englishWord.includes(searchWord.toLowerCase().trim());
      })
      .sort((a, b) => {
        if (sortOrder === "asc")
          return a.englishWord.localeCompare(b.englishWord);
        return b.englishWord.localeCompare(a.englishWord);
      })
      .filter((word) => {
        if (sortLevel === null) return true;
        return word.level === sortLevel;
      });
  }, [dictionary, sortLevel, sortOrder, searchWord]);

  function resetAllFilters() {
    setSearchWord("");
    setSortLevel(null);
    setSortOrder("asc");
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
  };
}

export default useWordsFiltering;
