import type { SearchInputProps } from "@/features/dictionaries/types";

function SearchInput({ onChange, value }: SearchInputProps) {
  return (
    <div className="relative flex h-full w-full items-center">
      <input
        placeholder="Пошук"
        className="rounded-buttons xs:text-lg h-full w-full items-center border border-blue-300 bg-blue-100 px-2 text-center text-base font-light text-blue-800 focus:outline-blue-500 md:text-xl"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default SearchInput;
