import type { LSPhraseWithDictWordValues } from "@/features/home/types";
import { getGeminiPhrase } from "@/features/home/services";
import { PHRASE_WITH_DICTIONARY_WORD } from "@/utils/storageAndSession/constants";

export const LSPhraseWithDictWordConfig: LSPhraseWithDictWordValues = {
  storageKey: PHRASE_WITH_DICTIONARY_WORD,
  defaultStorageValue: "[]",
  initialData: getGeminiPhrase,
};
