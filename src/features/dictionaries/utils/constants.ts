import { getOxford3000FromDB } from "@/features/dictionaries/services";
import type { LSOxford3000Values } from "@/features/dictionaries/types";
import { OXFORD_3000_KEY } from "@/shared/utils/storageAndSession/constants";

export const LSOxford3000Config: LSOxford3000Values = {
  storageKey: OXFORD_3000_KEY,
  defaultStorageValue: "[]",
  initialData: getOxford3000FromDB,
};

export const PHRASE_CREATING = "Генерування фрази...";
export const PHRASE_ERROR = "error";
