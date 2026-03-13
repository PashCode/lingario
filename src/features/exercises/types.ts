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
  voiceSettings: { voice: string; gender: string };
  vocabularyWords: Array<NewWordsValues | InProgressWordsValues>;
  selectedExercises: { flashCard: boolean; wordMatching: boolean };
  wordsLimit: number;
  isReady: boolean;
  sessionWords?: [];
  sessionSequence?: [];
}
