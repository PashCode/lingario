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

  // щоб при оновленні оксфорд паблік не миготів словник зі всіма словами. чекаємо доки завантажаться слова які я ще не додавав у персональний, поки чекаємо - віддаємо пустий масив
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
