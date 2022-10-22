import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

interface SignUpState {
  modal: boolean;
  numberIsVerified: boolean;
}

const initialState: SignUpState = {
  modal: false,
  numberIsVerified: false,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    handleModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setNumberIsVerified: (state, action: PayloadAction<boolean>) => {
      state.numberIsVerified = action.payload;
    },
  },
});

export const { handleModal } = signUpSlice.actions;

export const selectModal = (state: RootState) => state.signUp.modal;
export const selectNumberIsVerified = (state: RootState) =>
  state.signUp.numberIsVerified;

export default signUpSlice.reducer;
