import useWordsFiltering from "@/features/dictionary/hooks/useWordsFiltering";

export interface PublicDictionaryState {
  oxford3000: Array<Oxford3000Values>;
}

export interface Oxford3000Values {
  e: string;
  u: string;
  l: string;
}

export interface OxfordListProps {
  filteredWords: Array<Oxford3000Values>;
}

export interface LSOxford3000Values {
  storageKey: string;
  defaultStorageValue: string;
  initialData: () => Promise<PublicDictionaryState>;
}

export type FiltersReturn = ReturnType<typeof useWordsFiltering>;
export type FiltersProps = Omit<FiltersReturn, "filteredWords">;
export type FilterLevelProps = Pick<FiltersReturn, "sortLevel" | "setSortLevel">;
export type FilterOrderProps = Pick<FiltersReturn, "sortOrder" | "setSortOrder">;
export type FilterResetProps = Pick<FiltersReturn, "resetAllFilters">;

export type sortWordsLevel = "A1" | "A2" | "B1" | "B2" | null;
export type sortWordsOrder = "asc" | "desc";

export type fetchTTSProps = string | undefined | null;
export interface fetchTTSResponse {
  audioContent: string;
}
