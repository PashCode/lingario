export interface DictionaryState {
  oxford3000: Array<Oxford3000Values>;
}

export interface Oxford3000Values {
  e: string;
  u: string;
  l: string;
}

export interface LSOxford3000Values {
  storageKey: string;
  defaultStorageValue: string;
  initialData: () => Promise<DictionaryState>;
}
