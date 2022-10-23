import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestState } from "enums/.";
import type { RootState } from "store";

interface SignUpState {
  modal: boolean;
  sendVerificationCodeRequestState: RequestState;
  verifyPhoneNumberRequestState: RequestState;
}

const initialState: SignUpState = {
  modal: false,
  sendVerificationCodeRequestState: RequestState.IDLE,
  verifyPhoneNumberRequestState: RequestState.IDLE,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    handleModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setSendVerificationCodeRequestState: (
      state,
      action: PayloadAction<RequestState>
    ) => {
      state.sendVerificationCodeRequestState = action.payload;
    },
    setVerifyPhoneNumberRequestState: (
      state,
      action: PayloadAction<RequestState>
    ) => {
      state.sendVerificationCodeRequestState = action.payload;
    },
  },
});

export const {
  handleModal,
  setSendVerificationCodeRequestState,
  setVerifyPhoneNumberRequestState,
} = signUpSlice.actions;

export const selectModal = (state: RootState) => state.signUp.modal;
export const selectSendVerificationCodeRequestState = (state: RootState) =>
  state.signUp.sendVerificationCodeRequestState;
export const verifyPhoneNumberRequestState = (state: RootState) =>
  state.signUp.verifyPhoneNumberRequestState;

export default signUpSlice.reducer;
