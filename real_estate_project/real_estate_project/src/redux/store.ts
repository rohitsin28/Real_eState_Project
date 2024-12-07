import { configureStore } from "@reduxjs/toolkit";
import scrapingDataReducer from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    scrapingData: scrapingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
