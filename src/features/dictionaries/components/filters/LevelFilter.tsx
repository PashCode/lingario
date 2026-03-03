import { toggleFilters } from "@/features/dictionaries/utils/toggleFilters";
import Input from "@/shared/components/ui/Input";
import type { FilterLevelProps } from "@/features/dictionaries/types";

function LevelFilter({ sortLevel, setSortLevel }: FilterLevelProps) {
  const levels = ["A1", "A2", "B1", "B2"] as const;

  return (
    <div className="flex gap-2">
      {levels.map((level) => {
        return (
          <Input
            type="radio"
            labelText={level}
            htmlFor={`sort${level}`}
            id={`sort${level}`}
            checked={sortLevel === level}
            onChange={() => {}}
            onClick={() => toggleFilters(level, sortLevel, setSortLevel)}
            errorMessage={undefined}
            name="sortLevel"
            key={level}
          />
        );
      })}
    </div>
  );
}

export default LevelFilter;
