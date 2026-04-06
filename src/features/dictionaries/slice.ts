import { createSlice } from "@reduxjs/toolkit";
import type { DictionaryState } from "@/features/dictionaries/types";

const initialState: DictionaryState = {
  oxford3000: [],
  isOxford3000DictLoading: "loading",
  isAISentenceLoading: "loading",
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setOxford3000: (state, action) => {
      state.oxford3000 = action.payload;
      state.isOxford3000DictLoading = "success";
    },
    setIsOxford3000DictLoading: (state, action) => {
      state.isOxford3000DictLoading = action.payload;
    },
    setIsAISentenceLoading: (state, action) => {
      state.isAISentenceLoading = action.payload;
    },
    clearOxford3000: (state) => {
      state.oxford3000 = [];
      state.isOxford3000DictLoading = "loading";
    },
  },
  selectors: {
    selectOxford3000: (state) => state.oxford3000,
    selectIsOxford3000DictLoading: (state) => state.isOxford3000DictLoading,
    selectIsAISentenceLoading: (state) => state.isAISentenceLoading,
  },
});

export const {
  setOxford3000,
  setIsOxford3000DictLoading,
  clearOxford3000,
  setIsAISentenceLoading,
} = dictionarySlice.actions;

export const {
  selectOxford3000,
  selectIsOxford3000DictLoading,
  selectIsAISentenceLoading,
} = dictionarySlice.selectors;

export default dictionarySlice.reducer;
