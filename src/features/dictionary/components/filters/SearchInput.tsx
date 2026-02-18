import type { SearchInputProps } from "@/features/dictionary/types";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

function SearchInput({
  onChange,
  value,
  isSearchOpen,
  setIsSearchOpen,
  setSearchWord,
}: SearchInputProps) {
  return (
    <>
      {isSearchOpen ? (
        <Input
          labelText=""
          placeholder="Введіть слово"
          htmlFor={""}
          errorMessage={undefined}
          className="border-2 border-blue-600"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ) : (
        <Button onClick={() => setIsSearchOpen(true)} text="Знайти слово" />
      )}

      {isSearchOpen && (
        <Button
          text="Х"
          onClick={() => {
            setIsSearchOpen(false);
            setSearchWord("");
          }}
        />
      )}
    </>
  );
}

export default SearchInput;
