import { Timestamp } from "firebase/firestore";

export interface ExercisesState {
  newWords: Array<NewWordsValues>;
  repeatWords: Array<InProgressWordsValues>;
  exercisesConfig: any;
}

export interface BaseWordsValues {
  englishWord: string;
  translation: string;
  level: string;
  id: string;
  progress: string;
  addedAt: Timestamp;
  score: number;
}

export interface NewWordsValues extends BaseWordsValues {
  nextRepeat: Timestamp;
  phrase: string;
}

export type InProgressWordsValues = NewWordsValues;

export interface ExerciseConfigValues {
  pronunciation: { voice: string; gender: string };
  words: Array<NewWordsValues | InProgressWordsValues>;
  exercisesTypes: { flashCard: boolean; wordMatching: boolean };
  isReady: boolean;
}
