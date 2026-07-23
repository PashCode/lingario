import { createSlice } from "@reduxjs/toolkit";
import type { ExercisesState } from "@/features/exercises/types";

const initialState: ExercisesState = {
  newWords: [],
  repeatWords: [],
  exercisesConfig: {
    exerciseType: "",
    vocabularyWords: [],
    selectedExercises: { flashCard: false, wordMatching: false },
    wordsCount: 0,
    isReady: false,
    sessionWords: [],
    sessionSequence: [],
    multiplier: 0,
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
    clearExercisesState: () => initialState,
  },
  selectors: {
    selectNewWords: (state) => state.newWords,
    selectNewWordsCount: (state) => state.newWords.length,
    selectRepeatWords: (state) => state.repeatWords,
    selectRepeatWordsCount: (state) => state.repeatWords.length,
    selectExercisesConfig: (state) => state.exercisesConfig,
  },
});

export const {
  setNewWords,
  setRepeatWords,
  setExercisesConfig,
  clearExercisesState,
} = exercisesSlice.actions;

export const {
  selectNewWords,
  selectNewWordsCount,
  selectRepeatWords,
  selectRepeatWordsCount,
  selectExercisesConfig,
} = exercisesSlice.selectors;

export default exercisesSlice.reducer;
