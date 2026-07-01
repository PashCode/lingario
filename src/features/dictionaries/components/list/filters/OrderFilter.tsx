import type { FilterOrderProps } from "@/features/dictionaries/types";
import { toggleFilters } from "@/features/dictionaries/utils/toggleFilters";

function OrderFilter({ sortOrder, setSortOrder }: FilterOrderProps) {
  const orders = [
    { sort: "asc", label: "A-Z" },
    { sort: "desc", label: "Z-A" },
  ] as const;

  return (
    <div className="rounded-buttons xs:text-lg flex h-full w-full items-center border border-blue-300 bg-blue-100 text-base text-blue-800 transition-transform duration-100 ease-out active:scale-98 md:text-xl lg:text-lg xl:text-xl">
      {orders.map((order) => {
        return (
          <label
            key={order.sort}
            htmlFor={`sort${order.sort}`}
            className={`${sortOrder === order.sort ? "bg-blue-800 text-white" : ""} xs:px-3 flex h-full cursor-pointer items-center justify-center rounded-lg px-2 font-light`}
          >
            <input
              type="radio"
              id={`sort${order.sort}`}
              name="sortOrder"
              checked={sortOrder === order.sort}
              onChange={() => {}}
              onClick={() => toggleFilters(order.sort, sortOrder, setSortOrder)}
              className="sr-only"
            />
            {order.label}
          </label>
        );
      })}
    </div>
  );
}

export default OrderFilter;
