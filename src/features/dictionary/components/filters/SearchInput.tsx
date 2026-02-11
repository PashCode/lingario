import type { searchInputProps } from "@/features/dictionary/types";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

function SearchInput({
  onChange,
  value,
  isSearchOpen,
  setIsSearchOpen,
}: searchInputProps) {
  return (
    <>
      {isSearchOpen ? (
        <Input
          labelText="Введіть слово"
          htmlFor={""}
          errorMessage={undefined}
          className="border-2 border-blue-600"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ) : (
        <Button onClick={() => setIsSearchOpen(true)} text="Знайти слово" />
      )}
    </>
  );
}

export default SearchInput;
