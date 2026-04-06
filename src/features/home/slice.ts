import { createSlice } from "@reduxjs/toolkit";
import type { HomeState } from "@/features/home/types";

const initialState: HomeState = {
  homepageAISentence: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomepageAISentence: (state, action) => {
      state.homepageAISentence = action.payload;
    },
    clearHomepageAISentence: (state) => {
      state.homepageAISentence = "";
    },
  },
  selectors: {
    selectHomepageAISentence: (state) => state.homepageAISentence,
  },
});

export const { setHomepageAISentence, clearHomepageAISentence } =
  homeSlice.actions;
export const { selectHomepageAISentence } = homeSlice.selectors;

export default homeSlice.reducer;
