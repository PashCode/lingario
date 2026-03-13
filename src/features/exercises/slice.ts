import { createSlice } from "@reduxjs/toolkit";
import type { ExercisesState } from "@/features/exercises/types";

const initialState: ExercisesState = {
  newWords: [],
  repeatWords: [],
  exercisesConfig: {
    voiceSettings: { voice: "", gender: "" },
    vocabularyWords: [],
    selectedExercises: { flashCard: false, wordMatching: false },
    wordsLimit: 0,
    isReady: false,
    sessionWords: [],
    sessionSequence: [],
  },
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setNewWords: (state, action) => {
      state.newWords = action.payload;
    },
    setRepeatWords: (state, action) => {
      state.repeatWords = action.payload;
    },
    setExercisesConfig: (state, action) => {
      state.exercisesConfig = action.payload;
    },
  },
  selectors: {
    selectNewWords: (state) => state.newWords,
    selectNewWordsCount: (state) => state.newWords.length,
    selectRepeatWords: (state) => state.repeatWords,
    selectRepeatWordsCount: (state) => state.repeatWords.length,
    selectExercisesConfig: (state) => state.exercisesConfig,
  },
});

export const { setNewWords, setRepeatWords, setExercisesConfig } =
  exercisesSlice.actions;

export const {
  selectNewWords,
  selectNewWordsCount,
  selectRepeatWords,
  selectRepeatWordsCount,
  selectExercisesConfig,
} = exercisesSlice.selectors;

export default exercisesSlice.reducer;
