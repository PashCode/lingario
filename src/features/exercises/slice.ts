import { createSlice } from "@reduxjs/toolkit";
import type { ExercisesState } from "@/features/exercises/types";

const initialState: ExercisesState = {
  newWords: [],
  repeatWords: [],
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
  },
  selectors: {
    selectNewWords: (state) => state.newWords,
    selectNewWordsCount: (state) => state.newWords.length,
    selectRepeatWords: (state) => state.repeatWords,
    selectRepeatWordsCount: (state) => state.repeatWords.length,
  },
});

export const { setNewWords, setRepeatWords } = exercisesSlice.actions;

export const {
  selectNewWords,
  selectNewWordsCount,
  selectRepeatWords,
  selectRepeatWordsCount,
} = exercisesSlice.selectors;

export default exercisesSlice.reducer;
