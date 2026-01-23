export interface HomeState {
  phraseWithDictWord: ""
}

export interface LSPhraseWithDictWordValues {
  storageKey: string;
  defaultStorageValue: string;
  initialData: () => Promise<string | undefined>;
}

