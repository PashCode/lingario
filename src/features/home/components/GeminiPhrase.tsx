import { useAppSelector } from "@/app/store";
import { selectPhraseWithDictWord } from "@/features/home/slice";

function GeminiPhrase() {
  const phraseWithDictWord = useAppSelector(selectPhraseWithDictWord);
  return <h1>{phraseWithDictWord || "Завантаження..."}</h1>;
}

export default GeminiPhrase;
