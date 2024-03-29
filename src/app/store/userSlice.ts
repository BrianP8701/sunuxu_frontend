// app/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  transactionIds: string[];
}

const initialState: User = {
  username: "",
  email: "",
  phoneNumber: "",
  firstName: "",
  middleName: "",
  lastName: "",
  transactionIds: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;