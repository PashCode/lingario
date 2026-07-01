// a radio button can't turn off by clicking it again
// so this code turns it off by hand
export function toggleFilters<T>(
  value: T,
  sortStatus: T | null,
  setSortStatus: (sortStatus: T | null) => void,
) {
  if (sortStatus === value) setSortStatus(null);
  else setSortStatus(value);
}
