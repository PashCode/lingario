import type { LSHomepageAISentenceValues } from "@/features/home/types";
import { createHomepageAISentence } from "@/features/home/services";
import { HOMEPAGE_AI_SENTENCE_KEY } from "@/shared/utils/storageAndSession/constants";

export const LSHomepageAISentenceConfig: LSHomepageAISentenceValues = {
  storageKey: HOMEPAGE_AI_SENTENCE_KEY,
  defaultStorageValue: "[]",
  initialData: createHomepageAISentence,
};
