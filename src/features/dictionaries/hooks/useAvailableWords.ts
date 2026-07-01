import { useAppSelector } from "@/app/store";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import {
  selectIsOxford3000DictLoading,
  selectOxford3000,
} from "@/features/dictionaries/slice";
import type { Oxford3000Values } from "@/features/dictionaries/types";

function useAvailableWords() {
  const oxford3000 = useAppSelector(selectOxford3000);
  const isOxford3000DictLoading = useAppSelector(selectIsOxford3000DictLoading);
  const { personalDictionary, isPersonalDictLoading } = useDictSnapshot<Oxford3000Values>();

  // wait for both dictionaries to load first
  // if we don't wait, the screen flashes all oxford words for a second
  if (isPersonalDictLoading || isOxford3000DictLoading === "loading") {
    return {
      availableWords: [],
      isAvailableWordsLoading: true,
    };
  }

  const personalWords = new Set(
    personalDictionary.map((word) => word.englishWord),
  );

  return {
    availableWords: oxford3000.filter((word) => {
      return !personalWords.has(word.englishWord);
    }),
    isAvailableWordsLoading: false,
  };
}

export default useAvailableWords;
