import { useAppSelector } from "@/app/store";
import useDictSnapshot from "@/features/dictionary/hooks/useDictSnapshot";
import { selectOxford3000 } from "@/features/dictionary/slice";

function useAvailableWords() {
  const oxford3000 = useAppSelector(selectOxford3000);
  const { personalDictionary, isLoading } = useDictSnapshot();

  if (isLoading) return [];

  const personalWords = new Set(
    personalDictionary.map((word) => word.englishWord),
  );

  return oxford3000.filter((word) => {
    return !personalWords.has(word.englishWord);
  });
}

export default useAvailableWords;
