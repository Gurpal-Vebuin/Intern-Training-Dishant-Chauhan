import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenState } from "../../../types/interfaces/interface";

const initialState: TokenState = {
  token: "",
};

export const authSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { setToken } = authSlice.actions;
