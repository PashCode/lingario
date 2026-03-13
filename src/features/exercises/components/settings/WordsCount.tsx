import Button from "@/shared/components/ui/Button";
import type { WordsCountProps } from "@/features/exercises/types";

function WordsCount({ words, wordsLimit, setWordsLimit }: WordsCountProps) {
  return (
    <div className="flex items-center justify-center gap-2 border-2 border-green-800">
      <p>Кількість слів: </p>

      <Button
        text="-1"
        className="cursor-pointer border-2 disabled:bg-gray-500"
        onClick={() => setWordsLimit((prev) => Math.max(5, prev - 1))}
        disabled={wordsLimit === 5}
      ></Button>

      <Button
        text="+1"
        className="cursor-pointer border-2 disabled:bg-gray-500"
        onClick={() => setWordsLimit((prev) => prev + 1)}
        disabled={wordsLimit === words.length}
      ></Button>

      <p>
        {wordsLimit < words.length ? (
          wordsLimit
        ) : (
          <span>{words.length} - це всі слова зі словника</span>
        )}
      </p>
    </div>
  );
}

export default WordsCount;
