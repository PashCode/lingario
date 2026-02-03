import { useAppSelector } from "@/app/store";
import { selectOxford3000 } from "@/features/dictionary/public/slice";
import { useState } from "react";

function useSearchWord() {
  const oxford3000 = useAppSelector(selectOxford3000);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function getFilteredWords() {
    if (!searchWord) return oxford3000;
    return oxford3000.filter((word) => word.e.includes(searchWord.trim()));
  }

  return {
    getFilteredWords,
    searchWord,
    setSearchWord,
    isSearchOpen,
    setIsSearchOpen,
  };
}

export default useSearchWord;
