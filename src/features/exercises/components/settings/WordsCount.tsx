import Button from "@/shared/components/ui/Button";

function WordsCount({ words, wordsCount, setWordsCount }) {
  return (
    <div className="flex items-center justify-center gap-2 border-2 border-green-800">
      <p>Кількість слів: </p>

      <Button
        text="-1"
        className="cursor-pointer border-2 disabled:bg-gray-500"
        onClick={() => setWordsCount((prev) => Math.max(5, prev - 1))}
        disabled={wordsCount === 5}
      ></Button>

      <Button
        text="+1"
        className="cursor-pointer border-2 disabled:bg-gray-500"
        onClick={() => setWordsCount((prev) => prev + 1)}
        disabled={wordsCount === 15}
      ></Button>

      <p>
        {wordsCount <= words.length && wordsCount < 15 ? (
          wordsCount
        ) : (
          <span>багато</span>
        )}
      </p>
    </div>
  );
}

export default WordsCount;
