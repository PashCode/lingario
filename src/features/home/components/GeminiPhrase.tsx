import { useAppSelector } from "@/app/store";
import { selectPhraseWithDictWord } from "@/features/home/slice";
import PronounceButton from "@/shared/components/ui/PronounceButton";

function GeminiPhrase() {
  const phraseWithDictWord = useAppSelector(selectPhraseWithDictWord);
  return (
    <div className="flex gap-2">
      <h1>{phraseWithDictWord || "Завантаження..."}</h1>
      <PronounceButton text={phraseWithDictWord} size="20"/>
    </div>
  )
}

export default GeminiPhrase;
