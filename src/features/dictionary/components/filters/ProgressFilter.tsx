import type { FilterProgressProps } from "@/features/dictionary/types";
import { toggleFilters } from "@/features/dictionary/utils/toggleFilters";
import Input from "@/shared/components/ui/Input";

function ProgressFilter({
  sortProgress,
  setSortProgress,
}: FilterProgressProps) {
  return (
    <div className="flex gap-2">
      <span>
        <Input
          type="radio"
          labelText="Нові"
          htmlFor="sortNew"
          id="sortNew"
          checked={sortProgress === "new"}
          onChange={() => {}}
          onClick={() => toggleFilters("new", sortProgress, setSortProgress)}
          errorMessage={undefined}
          name="sortProgress"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="В процесі"
          htmlFor="sortInProgress"
          id="sortInProgress"
          checked={sortProgress === "in progress"}
          onChange={() => {}}
          onClick={() =>
            toggleFilters("in progress", sortProgress, setSortProgress)
          }
          errorMessage={undefined}
          name="sortProgress"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="Вивчені"
          htmlFor="studied"
          id="studied"
          checked={sortProgress === "studied"}
          onChange={() => {}}
          onClick={() =>
            toggleFilters("studied", sortProgress, setSortProgress)
          }
          errorMessage={undefined}
          name="sortProgress"
        />
      </span>
    </div>
  );
}

export default ProgressFilter;
