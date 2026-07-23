import Button from "@/shared/components/ui/Button";
import type { WordsCountProps } from "@/features/exercises/types";
import { toast } from "sonner";
import { useEffect } from "react";

function WordsCount({ words, wordsCount, setWordsCount }: WordsCountProps) {
  // tell the user why the "+" button stopped working
  useEffect(() => {
    if (wordsCount === words.length) {
      toast.warning(`В словнику доступно лише ${words.length} слів`, {
        duration: 3000,
      });
    }
  }, [words.length, wordsCount]);

  return (
    <div className="xs:h-9 flex h-8 w-full items-center justify-center gap-x-3 text-sm sm:h-12 sm:justify-end sm:text-lg md:h-14 md:text-xl lg:h-12 lg:text-lg 2xl:h-14 2xl:text-[22px]">
      <p className="text-blue-800">Кількість слів:</p>

      <div className="rounded-buttons xs:w-50 flex h-full w-30 items-center gap-x-3 overflow-hidden border border-blue-300 bg-blue-100 text-blue-800 transition-transform duration-100 ease-out active:scale-98 min-[360px]:w-35 min-[420px]:w-40 min-[550px]:w-60 sm:w-34 md:w-40">
        <Button
          text="-"
          className={`flex h-full flex-1 ${wordsCount === 4 ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center rounded-lg bg-blue-800 text-white disabled:bg-blue-300`}
          onClick={() => setWordsCount((prev) => Math.max(4, prev - 1))}
          disabled={wordsCount === 4}
        ></Button>
        <p className="w-7 text-center">{wordsCount}</p>
        <Button
          text="+"
          className={`flex h-full flex-1 ${wordsCount === words.length ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center rounded-lg bg-blue-800 text-white disabled:bg-blue-300`}
          onClick={() => setWordsCount((prev) => prev + 1)}
          disabled={wordsCount === words.length}
        ></Button>
      </div>
    </div>
  );
}

export default WordsCount;
