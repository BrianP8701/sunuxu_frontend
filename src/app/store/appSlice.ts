"use client";
// app/store/appSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { App } from "@/types/app";


const initialState: App = {
  current_page: "signin"
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.current_page = action.payload;
    }
  },
});

export const { setCurrentPage } = appSlice.actions;
export default appSlice.reducer;
