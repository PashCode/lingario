import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionary/slice";
import type {
  sortWordsLevel,
  sortWordsOrder,
} from "@/features/dictionary/types";
import { useState } from "react";

function useWordsFiltering() {
  const oxford3000 = useAppSelector(selectOxford3000);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortOrder, setSortOrder] = useState<sortWordsOrder>("asc");
  const [sortLevel, setSortLevel] = useState<sortWordsLevel>(null);

  function getFilteredWords() {
    return oxford3000
      .filter((word) => {
        return word.e.includes(searchWord.toLowerCase().trim());
      })
      .sort((a, b) => {
        if (sortOrder === "asc") return a.e.localeCompare(b.e);
        return b.e.localeCompare(a.e);
      })
      .filter((word) => {
        if (sortLevel === null) return true;
        return word.l === sortLevel;
      });
  }
  const filteredWords = getFilteredWords()

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
