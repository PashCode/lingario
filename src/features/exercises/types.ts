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
  voiceSetting: { voice: string; gender: string };
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
  words: Array<NewWordsValues | InProgressWordsValues> | null;
  exercise: React.ComponentType<ExerciseProps>;
  phase: number;
}

export interface ChangeScoreProps {
  resultType: "perfect" | "passed" | "failed";
  targetWord?: NewWordsValues | InProgressWordsValues;
}

export interface ExerciseProps {
  exercisesConfig: ExerciseConfigValues;
  currentIndex: number;
  setCurrentIndex: (value: number | ((prevState: number) => number)) => void;
  changeScore: (props: ChangeScoreProps) => void;
}

export interface VoiceSettingValues {
  voiceSetting: ExerciseConfigValues["voiceSetting"];
  setVoiceSetting: (props: ExerciseConfigValues["voiceSetting"]) => void;
}

export interface SelectedExercisesValues {
  flashCard: boolean;
  wordMatching: boolean;
  wordBuilding: boolean;
  wordListening: boolean;
  multipleChoices: boolean;
}

export interface ExercisesTypeProps {
  selectedExercises: SelectedExercisesValues;
  setSelectedExercises: (
    value: (prevState: SelectedExercisesValues) => SelectedExercisesValues,
  ) => void;
  isExerciseSelectionEmpty: boolean;
  setIsExerciseSelectionEmpty: (props: boolean) => void;
}

export interface ExercisesByTypeValues {
  flashCard: Array<SessionSequenceValues>;
  wordMatching: Array<SessionSequenceValues>;
  wordBuilding: Array<SessionSequenceValues>;
  wordListening: Array<SessionSequenceValues>;
  multipleChoices: Array<SessionSequenceValues>;
}

export interface WordsCountProps {
  words: Array<NewWordsValues | InProgressWordsValues>;
  wordsLimit: number;
  setWordsLimit: (value: (prevState: number) => number) => void;
}

export interface SelectionControlsProps {
  setSelectedExercises: (value: SelectedExercisesValues) => void;
  setIsExerciseSelectionEmpty: (value: boolean) => void;
}

export type SessionResultsValues = Record<string, NewWordsValues | InProgressWordsValues>


export interface WordColumnProps {
  words: Array<BaseWordsValues>;
  type: "englishWords" | "translations";
  selectedValue: string | null;
  matchedWordIds: string[];
  isCheckingMatch: boolean;
  selectedEng: string | null;
  selectedTr: string | null;
  handleWordClick: (
    wordId: string,
    type: "englishWords" | "translations",
  ) => void;
  voiceSettings: ExerciseConfigValues["voiceSetting"];
}