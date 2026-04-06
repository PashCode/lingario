import useWordsFiltering from "@/features/dictionaries/hooks/useWordsFiltering";
import { Timestamp, FieldValue } from "firebase/firestore";

export interface DictionaryState {
  oxford3000: Array<Oxford3000Values>;
  isOxford3000DictLoading: "loading" | "success" | "error";
  isAISentenceLoading: "loading" | "success" | "error";
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

export interface WordNotFoundProps {
  dictionary: Array<Oxford3000Values>;
  searchWord: string;
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

export type SortWordsLevel = "A1" | "A2" | "B1" | "B2" | null;
export type SortWordsOrder = "asc" | "desc" | null;
export type SortWordProgress = "new" | "in progress" | "studied" | null;

export type FetchTTSProps = string | undefined | null;

export interface FetchTTSResponse {
  audioContent: string;
}

export interface SearchInputProps {
  onChange: (param: string) => void;
  value: string;
  isSearchOpen: boolean;
  setSearchWord: (param: string) => void;
  setIsSearchOpen: (param: boolean) => void;
}

export interface WordControlsProps {
  englishWord: string;
  translation: string;
  level: string;
  addedAt?: Timestamp;
  id: string;
  processingWord: null | string;
  setProcessingWord: (value: null | string) => void;
}

export interface WordContentProps {
  englishWord: string;
  level: string;
  phrase?: string;
  progress?: string;
  nextRepeat?: Timestamp;
}

export interface AddWordToPersonalDictProps {
  id: string;
  englishWord: string;
  translation: string;
  level: string;
  addedAt: FieldValue;
  progress: string;
  score: number;
  phrase?: string;
  nextRepeat?: FieldValue;
}

export interface LevelStats {
  A1: number;
  A2: number;
  B1: number;
  B2: number;
}

export interface LevelStatsWithTotal extends LevelStats {
  allWords: number;
}

export interface StatListProps {
  oxford3000Total: LevelStats;
  oxford3000Added: LevelStatsWithTotal;
}
