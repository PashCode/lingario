import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import baseApi from "@/shared/api/baseApi";
import authReducer from "@/features/auth/slice";
import homeReducer from "@/features/home/slice";
import dictionaryReducer from "@/features/dictionaries/slice";
import exercisesReducer from "@/features/exercises/slice";
import profileReducer from "@/features/profile/slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    dictionary: dictionaryReducer,
    exercises: exercisesReducer,
    profile: profileReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
