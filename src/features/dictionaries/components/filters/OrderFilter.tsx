import Input from "@/shared/components/ui/Input";
import type { FilterOrderProps } from "@/features/dictionaries/types";
import { toggleFilters } from "@/features/dictionaries/utils/toggleFilters";

function OrderFilter({ sortOrder, setSortOrder }: FilterOrderProps) {
  const orders = [
    { sort: "asc", label: "A-Z" },
    { sort: "desc", label: "Z-A" },
  ] as const;

  return (
    <div className="flex gap-2">
      {orders.map((order) => {
        return (
          <Input
            type="radio"
            labelText={order.label}
            htmlFor={`sort${order.sort}`}
            id={`sort${order.sort}`}
            name="sortOrder"
            checked={sortOrder === order.sort}
            onChange={() => {}}
            onClick={() => toggleFilters(order.sort, sortOrder, setSortOrder)}
            errorMessage={undefined}
            key={order.sort}
          />
        );
      })}
    </div>
  );
}

export default OrderFilter;
