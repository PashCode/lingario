import Input from "@/shared/components/ui/Input";
import type { FilterLevelProps } from "@/features/dictionary/types";

function LevelFilter({ sortLevel, setSortLevel }: FilterLevelProps) {
  return (
    <div className="flex gap-2">
      <span>
        <Input
          type="radio"
          labelText="A1"
          checked={sortLevel === "A1"}
          onChange={() => setSortLevel("A1")}
          htmlFor={""}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="A2"
          checked={sortLevel === "A2"}
          onChange={() => setSortLevel("A2")}
          htmlFor={""}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="B1"
          checked={sortLevel === "B1"}
          onChange={() => setSortLevel("B1")}
          htmlFor={""}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="B2"
          checked={sortLevel === "B2"}
          onChange={() => setSortLevel("B2")}
          htmlFor={""}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
    </div>
  );
}

export default LevelFilter;
