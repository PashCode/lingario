import Input from "@/shared/components/ui/Input";
import type { FilterOrderProps } from "@/features/dictionary/types";

function OrderFilter({ sortOrder, setSortOrder }: FilterOrderProps) {
  return (
    <div className="flex gap-2">
      <span>
        <Input
          type="radio"
          labelText="A-Z"
          checked={sortOrder === "asc"}
          onChange={() => setSortOrder("asc")}
          htmlFor={""}
          errorMessage={undefined}
          name="sortGroup"
        />
      </span>
      <span>
        <Input
          type="radio"
          labelText="Z-A"
          checked={sortOrder === "desc"}
          onChange={() => setSortOrder("desc")}
          htmlFor={""}
          errorMessage={undefined}
          name="sortGroup"
        />
      </span>
    </div>
  );
}

export default OrderFilter;
