import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestState } from "enums/.";
import type { RootState } from "store";

interface SignUpState {
  modal: boolean;
  phoneNumber: string;
  sendVerificationCodeRequestState: RequestState;
  verifyPhoneNumberRequestState: RequestState;
  signUpRequestState: RequestState;
}

const initialState: SignUpState = {
  modal: false,
  phoneNumber: "",
  sendVerificationCodeRequestState: RequestState.IDLE,
  verifyPhoneNumberRequestState: RequestState.IDLE,
  signUpRequestState: RequestState.IDLE,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    handleModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
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
    setSignUpRequestState: (state, action: PayloadAction<RequestState>) => {
      state.signUpRequestState = action.payload;
    },
  },
});

export const {
  handleModal,
  setPhoneNumber,
  setSendVerificationCodeRequestState,
  setVerifyPhoneNumberRequestState,
  setSignUpRequestState,
} = signUpSlice.actions;

export const selectModal = (state: RootState) => state.signUp.modal;
export const selectPhoneNumber = (state: RootState) => state.signUp.phoneNumber;
export const selectSendVerificationCodeRequestState = (state: RootState) =>
  state.signUp.sendVerificationCodeRequestState;
export const selectVerifyPhoneNumberRequestState = (state: RootState) =>
  state.signUp.verifyPhoneNumberRequestState;
export const selectSignUpRequestState = (state: RootState) =>
  state.signUp.signUpRequestState;

export default signUpSlice.reducer;
