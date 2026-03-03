import type { DictionaryListProps } from "@/features/dictionaries/types";

function WordNotFound({ dictionary }: DictionaryListProps) {
  return (
    !dictionary.length && (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Такого слова немає в словнику</h1>
      </div>
    )
  );
}

export default WordNotFound;
