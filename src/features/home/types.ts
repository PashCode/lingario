export interface HomeState {
  AIEverydayPhrase: ""
}

export interface LSAIEverydayPhraseValues {
  storageKey: string;
  defaultStorageValue: string;
  initialData: () => Promise<string | undefined>;
}

