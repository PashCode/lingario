import { useAppSelector } from "@/app/store";
import useDictSnapshot from "@/shared/hooks/useDictSnapshot";
import { selectOxford3000 } from "@/features/dictionaries/slice";
import type { Oxford3000Values } from "@/features/dictionaries/types";

function useAvailableWords() {
  const oxford3000 = useAppSelector(selectOxford3000);
  const { personalDictionary, isDictLoading } = useDictSnapshot<Oxford3000Values>();

  if (isDictLoading) return [];

  const personalWords = new Set(
    personalDictionary.map((word) => word.englishWord),
  );

  return oxford3000.filter((word) => {
    return !personalWords.has(word.englishWord);
  });
}

export default useAvailableWords;
