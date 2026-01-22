import { createSlice } from "@reduxjs/toolkit";
import type { HomeState } from "@/features/home/types";

const initialState: HomeState = {
  AIEverydayPhrase: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setAIEverydayPhrase: (state, action) => {
      state.AIEverydayPhrase = action.payload;
    },
    clearAIEverydayPhrase: (state) => {
      state.AIEverydayPhrase = "";
    },
  },
  selectors: {
    selectAIEverydayPhrase: (state) => state.AIEverydayPhrase,
  },
});

export const { setAIEverydayPhrase, clearAIEverydayPhrase } = homeSlice.actions;
export const { selectAIEverydayPhrase } = homeSlice.selectors;

export default homeSlice.reducer;
