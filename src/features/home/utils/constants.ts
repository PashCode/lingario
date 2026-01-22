import type { LSAIEverydayPhraseValues } from "@/features/home/types";
import { getAIEverydayPhrase } from "@/features/home/services";

export const LSAIEverydayPhraseConfig: LSAIEverydayPhraseValues = {
  storageKey: "AI-everyday-phrase",
  defaultStorageValue: "[]",
  initialData: getAIEverydayPhrase,
};
