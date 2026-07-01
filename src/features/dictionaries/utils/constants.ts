import { getOxford3000FromDB } from "@/features/dictionaries/services";
import type { LSOxford3000Values } from "@/features/dictionaries/types";
import { OXFORD_3000_KEY } from "@/shared/utils/storageAndSession/constants";

export const LSOxford3000Config: LSOxford3000Values = {
  storageKey: OXFORD_3000_KEY,
  defaultStorageValue: "[]",
  initialData: getOxford3000FromDB,
};

// this text is shown to the user, and also used to check the state
// don't change it without checking both places
export const SENTENCE_CREATING = "Генерування фрази...";
export const SENTENCE_ERROR = "error";
