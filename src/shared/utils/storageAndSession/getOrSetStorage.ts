import type { LSOxford3000Values } from "@/features/dictionaries/types";
import type { LSPhraseWithDictWordValues } from "@/features/home/types";

async function getOrSetStorage(
  config: LSOxford3000Values | LSPhraseWithDictWordValues,
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

export default getOrSetStorage;
