import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slice";
import dictionaryReducer from "@/features/dictionary/slice"
import homeReducer from "@/features/home/slice"
import baseApi from "@/shared/api/baseApi";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dictionary: dictionaryReducer,
    home: homeReducer,
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
