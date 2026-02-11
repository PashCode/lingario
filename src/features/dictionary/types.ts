import useWordsFiltering from "@/features/dictionary/hooks/useWordsFiltering";
import { Timestamp } from "firebase/firestore";

export interface DictionaryState {
  oxford3000: Array<Oxford3000Values>;
}

export interface DBOxford3000Values {
  e: string;
  u: string;
  l: string;
}

export interface Oxford3000Values {
  englishWord: string;
  translation: string;
  level: string;
  id?: string;
  progress?: string;
  addedAt?: Timestamp;
  nextRepeat?: Timestamp;
  score?: number;
  phrase?: string;
}

export interface DictionaryListProps {
  dictionary: Array<Oxford3000Values>;
}

export interface LSOxford3000Values {
  storageKey: string;
  defaultStorageValue: string;
  initialData: () => Promise<DictionaryState>;
}

export type FiltersReturn = ReturnType<typeof useWordsFiltering>;
export type FiltersProps = Omit<FiltersReturn, "filteredWords"> & {
  typeDictionary: "public" | "personal";
};
export type FilterLevelProps = Pick<FiltersReturn, "sortLevel" | "setSortLevel">;
export type FilterOrderProps = Pick<FiltersReturn, "sortOrder" | "setSortOrder">;
export type FilterProgressProps = Pick<FiltersReturn, "sortProgress" | "setSortProgress">;
export type FilterResetProps = Pick<FiltersReturn, "resetAllFilters">;

export type sortWordsLevel = "A1" | "A2" | "B1" | "B2" | null;
export type sortWordsOrder = "asc" | "desc" | null;
export type sortWordProgress = "new" | "in progress" | "studied" | null;

export type fetchTTSProps = string | undefined | null;

export interface fetchTTSResponse {
  audioContent: string;
}

export interface searchInputProps {
  onChange: (param: string) => void;
  value: string;
  isSearchOpen: boolean;
  setIsSearchOpen: (param: boolean) => void;
}
