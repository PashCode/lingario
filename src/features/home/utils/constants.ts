import type { LSPhraseWithDictWordValues } from "@/features/home/types";
import { createHomepagePhrase } from "@/features/home/services";
import { PHRASE_WITH_DICTIONARY_WORD_KEY } from "@/shared/utils/storageAndSession/constants";

export const LSPhraseWithDictWordConfig: LSPhraseWithDictWordValues = {
  storageKey: PHRASE_WITH_DICTIONARY_WORD_KEY,
  defaultStorageValue: "[]",
  initialData: createHomepagePhrase,
};
