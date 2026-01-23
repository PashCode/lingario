import { createSlice } from "@reduxjs/toolkit";
import type { HomeState } from "@/features/home/types";

const initialState: HomeState = {
  phraseWithDictWord: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPhraseWithDictWord: ( state, action) => {
      state.phraseWithDictWord = action.payload;
    },
    clearPhraseWithDictWord: ( state) => {
      state.phraseWithDictWord = "";
    },
  },
  selectors: {

    selectPhraseWithDictWord: ( state) => state.phraseWithDictWord,
  },
});

export const { setPhraseWithDictWord, clearPhraseWithDictWord } = homeSlice.actions;
export const { selectPhraseWithDictWord } = homeSlice.selectors;

export default homeSlice.reducer;
