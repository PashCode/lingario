import { toggleFilters } from "@/features/dictionary/utils/toggleFilters";
import Input from "@/shared/components/ui/Input";
import type { FilterLevelProps } from "@/features/dictionary/types";

function LevelFilter({ sortLevel, setSortLevel }: FilterLevelProps) {
  return (
    <div className="flex gap-2">
      <span>
        <Input
          type="radio"
          labelText="A1"
          htmlFor="sortA1"
          id="sortA1"
          checked={sortLevel === "A1"}
          onChange={() => {}}
          onClick={() => toggleFilters("A1", sortLevel, setSortLevel)}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="A2"
          htmlFor="sortA2"
          id="sortA2"
          checked={sortLevel === "A2"}
          onChange={() => {}}
          onClick={() => toggleFilters("A2", sortLevel, setSortLevel)}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="B1"
          htmlFor="sortB1"
          id="sortB1"
          checked={sortLevel === "B1"}
          onChange={() => {}}
          onClick={() => toggleFilters("B1", sortLevel, setSortLevel)}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="B2"
          htmlFor="sortB2"
          id="sortB2"
          checked={sortLevel === "B2"}
          onChange={() => {}}
          onClick={() => toggleFilters("B2", sortLevel, setSortLevel)}
          errorMessage={undefined}
          name="sortLevel"
        />
      </span>
    </div>
  );
}

export default LevelFilter;
