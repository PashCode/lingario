import { Timestamp } from "firebase/firestore";

export interface HomeState {
  homepageAISentence: ""
}

export interface LSHomepageAISentenceValues {
  storageKey: string;
  defaultStorageValue: string;
  initialData: () => Promise<string | undefined>;
}

export interface PersonalWordValues {
  englishWord: string;
  translation: string;
  level: string;
  id?: string;
  progress?: string;
  addedAt?: Timestamp;
  nextRepeat?: Timestamp;
  score?: number;
  phrase?: string;
}
