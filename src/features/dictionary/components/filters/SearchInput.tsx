import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import type { Dispatch, SetStateAction } from "react";

function SearchInput( {
  onChange,
  value,
  isSearchOpen,
  setIsSearchClick,
}: {
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  isSearchOpen: boolean;
  setIsSearchClick: Dispatch<SetStateAction<boolean>>;
}) {
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
        <Button onClick={() => setIsSearchClick(true)} text="Знайти слово" />
      )}
    </>
  );
}

export default SearchInput;
