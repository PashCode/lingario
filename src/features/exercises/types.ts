import { Timestamp } from "firebase/firestore";
import * as React from "react";

export interface ExercisesState {
  newWords: Array<NewWordsValues>;
  repeatWords: Array<InProgressWordsValues>;
  exercisesConfig: ExerciseConfigValues;
}

export type PersonalWordsProgressValues = Omit<ExercisesState, "exercisesConfig">;

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
  sessionWords: Array<NewWordsValues | InProgressWordsValues>;
  sessionSequence: Array<SessionSequenceValues>;
  multiplier: number;
}

export interface SessionSequenceValues {
  word: NewWordsValues | InProgressWordsValues;
  exercise: React.ComponentType<ExerciseProps>;
}

export interface ChangeScoreProps {
  resultType: "perfect" | "passed" | "failed";
}

export interface ExerciseProps {
  exercisesConfig: ExerciseConfigValues;
  currentIndex: number;
  setCurrentIndex: (value: number | ((prevState: number) => number)) => void;
  changeScore: (props: ChangeScoreProps) => void;
}

export interface VoiceSettingsValues {
  voiceSettings: ExerciseConfigValues["voiceSettings"];
  setVoiceSettings: (props: ExerciseConfigValues["voiceSettings"]) => void;
}

export interface SelectedExercisesValues {
  flashCard: boolean;
  wordMatching: boolean;
  wordBuilding: boolean;
  wordListening: boolean;
}

export interface ExercisesTypeProps {
  selectedExercises: SelectedExercisesValues;
  setSelectedExercises: (
    value: (prevState: SelectedExercisesValues) => SelectedExercisesValues,
  ) => void;
  showError: boolean;
  setShowError: (props: boolean) => void;
}

export interface ExercisesByTypeValues {
  flashCard: Array<SessionSequenceValues>;
  wordMatching: Array<SessionSequenceValues>;
  wordBuilding: Array<SessionSequenceValues>;
  wordListening: Array<SessionSequenceValues>;
}

export interface WordsCountProps {
  words: Array<NewWordsValues | InProgressWordsValues>;
  wordsLimit: number;
  setWordsLimit: (value: (prevState: number) => number) => void;
}

export interface SelectionControlsProps {
  setSelectedExercises: (value: SelectedExercisesValues) => void;
  setShowError: (value: boolean) => void;
}

export type SessionResultsValues = Record<string, NewWordsValues | InProgressWordsValues>
