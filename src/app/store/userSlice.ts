// app/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSlice } from "@/types/reduxSlices";

const initialState: UserSlice = {
  id: 0,
  email: "",
  phone: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  user_type: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSlice>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
