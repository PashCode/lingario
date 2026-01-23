import { getOxford3000FromDB } from "@/features/dictionary/services";
import type { LSOxford3000Values } from "@/features/dictionary/types";
import { OXFORD_3000 } from "@/utils/storageAndSession/constants";

export const LSOxford3000Config: LSOxford3000Values = {
  storageKey: OXFORD_3000,
  defaultStorageValue: "[]",
  initialData: getOxford3000FromDB,
};
