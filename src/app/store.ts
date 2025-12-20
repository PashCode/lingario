import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// 1. RootState: це тип всього твого стейту (auth, user, posts і т.д.)
export type RootState = ReturnType<typeof store.getState>;
// 2. AppDispatch: це тип для dispatch (знадобиться пізніше для асинхронних дій)
export type AppDispatch = typeof store.dispatch;


export default store;
