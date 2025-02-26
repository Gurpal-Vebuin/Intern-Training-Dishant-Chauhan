import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LangState } from "../../../types/interfaces/interface";

const initialState: LangState = {
  language: "en",
};

export const langSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export default langSlice.reducer;
export const { setLanguage } = langSlice.actions;
