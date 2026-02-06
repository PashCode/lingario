import type { OxfordListProps } from "@/features/dictionary/types";

function WordNotFound({ filteredWords }: OxfordListProps) {
  return (
    !filteredWords.length && (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Такого слова немає в словнику</h1>
      </div>
    )
  );
}

export default WordNotFound;
