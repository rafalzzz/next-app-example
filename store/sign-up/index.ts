import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

interface SignUpState {
  modal: boolean;
}

const initialState: SignUpState = {
  modal: false,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    handleModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
  },
});

export const { handleModal } = signUpSlice.actions;

export const selectModal = (state: RootState) => state.signUp.modal;

export default signUpSlice.reducer;
