import type { LSOxford3000Values } from "@/features/dictionary/types";
import type { LSAIEverydayPhraseValues } from "@/features/home/types";

async function getStorageOrFetch(
  config: LSOxford3000Values | LSAIEverydayPhraseValues,
) {
  const existingValues = JSON.parse(
    localStorage.getItem(config.storageKey) || config.defaultStorageValue,
  );

  if (existingValues.length) {
    return existingValues;
  }

  const newValues =
    typeof config.initialData === "function"
      ? await config.initialData()
      : config.initialData;

  localStorage.setItem(config.storageKey, JSON.stringify(newValues));

  return newValues;
}

export default getStorageOrFetch;
