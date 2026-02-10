import { createSlice } from "@reduxjs/toolkit";
import type { DictionaryState } from "@/features/dictionary/types";

const initialState: DictionaryState = {
  oxford3000: [],
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setOxford3000: (state, action) => {
      state.oxford3000 = action.payload;
    },
    clearOxford3000: (state) => {
      state.oxford3000 = [];
    },
  },
  selectors: {
    selectOxford3000: (state) => state.oxford3000,
  },
});

export const { setOxford3000, clearOxford3000 } = dictionarySlice.actions;
export const { selectOxford3000 } = dictionarySlice.selectors;

export default dictionarySlice.reducer;
