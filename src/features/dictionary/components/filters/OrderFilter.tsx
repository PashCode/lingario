import Input from "@/shared/components/ui/Input";
import type { FilterOrderProps } from "@/features/dictionary/types";
import { toggleFilters } from "@/features/dictionary/utils/toggleFilters";

function OrderFilter({ sortOrder, setSortOrder }: FilterOrderProps) {
  return (
    <div className="flex gap-2">
      <span>
        <Input
          type="radio"
          labelText="A-Z"
          htmlFor="sortAZ"
          id="sortAZ"
          name="sortOrder"
          checked={sortOrder === "asc"}
          onChange={() => {}}
          onClick={() => toggleFilters("asc", sortOrder, setSortOrder)}
          errorMessage={undefined}
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="Z-A"
          htmlFor="sortZA"
          id="sortZA"
          checked={sortOrder === "desc"}
          onChange={() => {}}
          onClick={() => toggleFilters("desc", sortOrder, setSortOrder)}
          errorMessage={undefined}
          name="sortOrder"
        />
      </span>
    </div>
  );
}

export default OrderFilter;
