export function toggleFilters<T>(
  value: T,
  sortStatus: T | null,
  setSortStatus: (sortStatus: T | null) => void,
) {
  if (sortStatus === value) setSortStatus(null);
  else setSortStatus(value);
}
