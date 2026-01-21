import { createSlice } from "@reduxjs/toolkit";
import type { DictionaryState } from "@/features/dictionary/types";

const initialState: DictionaryState = {
  oxfordDictionary: [],
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setOxfordDictionary: (state, action) => {
      state.oxfordDictionary = action.payload;
    },
  },
  selectors: {
    selectOxfordDictionary: (state) => state.oxfordDictionary,
  },
});

export const { setOxfordDictionary } = dictionarySlice.actions;
export const { selectOxfordDictionary } = dictionarySlice.selectors;

export default dictionarySlice.reducer;
