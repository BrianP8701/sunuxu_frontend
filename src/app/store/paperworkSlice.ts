// app/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaperworkSlice } from "@/types/reduxSlices";

const initialState: PaperworkSlice = {
    editor_current_file: null
};

const paperworkSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEditorCurrentFile: (state, action: PayloadAction<File | null | string>) => {
      state.editor_current_file = action.payload;
    }
  },
});

export const { setEditorCurrentFile } = paperworkSlice.actions;
export default paperworkSlice.reducer;
