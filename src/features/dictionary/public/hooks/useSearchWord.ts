import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionary/public/slice";
import { useState } from "react";

function useSearchWord() {
  const oxford3000 = useAppSelector(selectOxford3000);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortLevel, setSortLevel] = useState<"A1" | "A2" | "B1" | "B2">("A1");

  function getFilteredWords() {
    return oxford3000
      .filter((word) => {
        return word.e.includes(searchWord.toLowerCase().trim());
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.e.localeCompare(b.e);
        } else {
          return b.e.localeCompare(a.e);
        }
      })
      .filter((word) => {
        return word.l === sortLevel;
      });
  }

  return {
    getFilteredWords,
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

export default useSearchWord;
