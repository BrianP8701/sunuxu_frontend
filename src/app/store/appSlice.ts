"use client";
// app/store/appSlice.ts
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { AppSlice } from "@/types/reduxSlices";

const initialState: AppSlice = {
  current_page: "signin",
};

const resetAppState = createAction('app/resetAppState', () => {
  console.log("Preparing to reset app state to initial state");
  return { payload: initialState };
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.current_page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppState, (state, action) => {
      return action.payload; // This ensures the state is replaced
    });
  }
});

export const { setCurrentPage } = appSlice.actions;
export default appSlice.reducer;
export { resetAppState };
