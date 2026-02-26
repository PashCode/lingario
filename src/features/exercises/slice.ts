import { createSlice } from "@reduxjs/toolkit";
import type { ExercisesState } from "@/features/exercises/types";

const initialState: ExercisesState = {
  newWords: [],
  inProgressWords: [],
};

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setNewWords: (state, action) => {
      state.newWords = action.payload;
    },
    setInProgressWords: (state, action) => {
      state.inProgressWords = action.payload;
    },
  },
  selectors: {
    selectNewWords: (state) => state.newWords,
    selectNewWordsCount: (state) => state.newWords.length,
    selectInProgressWords: (state) => state.inProgressWords,
    selectInProgressWordsCount: (state) => state.inProgressWords.length,
  },
});

export const { setNewWords, setInProgressWords } = exercisesSlice.actions;

export const {
  selectNewWords,
  selectNewWordsCount,
  selectInProgressWords,
  selectInProgressWordsCount,
} = exercisesSlice.selectors;

export default exercisesSlice.reducer;
