import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";
import { SendVerificationCodeRequest } from "sign-up/types";
import { RequestState } from "enums/.";

interface SignUpState {
  phoneNumber: string;
  sendVerificationCodeRequestState: RequestState;
  signUpRequestState: RequestState;
  signUpFormValues: SendVerificationCodeRequest | null;
}

const initialState: SignUpState = {
  phoneNumber: "",
  sendVerificationCodeRequestState: RequestState.IDLE,
  signUpRequestState: RequestState.IDLE,
  signUpFormValues: null,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setSendVerificationCodeRequestState: (
      state,
      action: PayloadAction<RequestState>
    ) => {
      state.sendVerificationCodeRequestState = action.payload;
    },
    setSignUpRequestState: (state, action: PayloadAction<RequestState>) => {
      state.signUpRequestState = action.payload;
    },
    setSignUpFormValues: (
      state,
      action: PayloadAction<SendVerificationCodeRequest>
    ) => {
      state.signUpFormValues = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setSendVerificationCodeRequestState,
  setSignUpRequestState,
  setSignUpFormValues,
} = signUpSlice.actions;

export const selectPhoneNumber = (state: RootState) => state.signUp.phoneNumber;
export const selectSendVerificationCodeRequestState = (state: RootState) =>
  state.signUp.sendVerificationCodeRequestState;
export const selectSignUpRequestState = (state: RootState) =>
  state.signUp.signUpRequestState;
export const selectSignUpFormValues = (state: RootState) =>
  state.signUp.signUpFormValues;

export default signUpSlice.reducer;
