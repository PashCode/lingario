import type { FilterProgressProps } from "@/features/dictionaries/types";
import { toggleFilters } from "@/features/dictionaries/utils/toggleFilters";
import Input from "@/shared/components/ui/Input";

function ProgressFilter({
  sortProgress,
  setSortProgress,
}: FilterProgressProps) {
  const progresses = [
    { sort: "new", label: "Нові" },
    { sort: "in progress", label: "В процесі" },
    { sort: "studied", label: "Вивчені" },
  ] as const;

  return (
    <div className="flex gap-2">
      {progresses.map((progress) => {
        return (
          <Input
            type="radio"
            labelText={progress.label}
            htmlFor={`sort${progress.sort}`}
            id={`sort${progress.sort}`}
            checked={sortProgress === progress.sort}
            onChange={() => {}}
            onClick={() => toggleFilters(progress.sort, sortProgress, setSortProgress) }
            errorMessage={undefined}
            name="sortProgress"
            key={progress.sort}
          />
        );
      })}
    </div>
  );
}

export default ProgressFilter;
