import { createSlice } from "@reduxjs/toolkit";
import type { HomeState } from "@/features/home/types";

const initialState: HomeState = {
  homepageAISentence: "",
  homepageAISentenceStatus: "loading",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomepageAISentence: (state, action) => {
      state.homepageAISentence = action.payload;
    },
    setHomepageAISentenceStatus: (state, action) => {
      state.homepageAISentenceStatus = action.payload;
    },
    clearHomepageAISentence: (state) => {
      state.homepageAISentence = "";
      state.homepageAISentenceStatus = "loading";
    },
  },
  selectors: {
    selectHomepageAISentence: (state) => state.homepageAISentence,
    selectHomepageAISentenceStatus: (state) => state.homepageAISentenceStatus,
  },
});

export const {
  setHomepageAISentence,
  setHomepageAISentenceStatus,
  clearHomepageAISentence,
} =
  homeSlice.actions;
export const {
  selectHomepageAISentence,
  selectHomepageAISentenceStatus,
} = homeSlice.selectors;

export default homeSlice.reducer;
