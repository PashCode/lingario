import { getOxfordDictionaryFromDB } from "@/features/dictionary/services";
import type { LSOxford3000Values } from "@/features/dictionary/types";

export const LSOxford3000Config: LSOxford3000Values = {
  storageKey: "oxford-dictionary",
  defaultStorageValue: "[]",
  initialData: getOxfordDictionaryFromDB,
};
