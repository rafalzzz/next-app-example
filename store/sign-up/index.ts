import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "shared/utils/storage";
import type { RootState } from "store";
import { SignUpFormType } from "sign-up/types";
import { ReducerKeys, RequestState } from "enums/.";

const TOKEN_EXPIRATION_TIME = 60;

interface SignUpState {
  phoneNumber: string;
  sendVerificationCodeRequestState: RequestState;
  signUpRequestState: RequestState;
  signUpFormValues: SignUpFormType | null;
  tokenValidityTime: number;
}

const initialState: SignUpState = {
  phoneNumber: "",
  sendVerificationCodeRequestState: RequestState.IDLE,
  signUpRequestState: RequestState.IDLE,
  signUpFormValues: null,
  tokenValidityTime: TOKEN_EXPIRATION_TIME,
};

export const signUpSlice = createSlice({
  name: ReducerKeys.SIGN_UP,
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
    setSignUpFormValues: (state, action: PayloadAction<SignUpFormType>) => {
      state.signUpFormValues = action.payload;
    },
    setCountdownTokenValidityTime: (state) => {
      state.tokenValidityTime = state.tokenValidityTime - 1;
    },
    setClearSignUpData: (state) => {
      state.phoneNumber = initialState.phoneNumber;
      state.sendVerificationCodeRequestState =
        initialState.sendVerificationCodeRequestState;
      state.signUpRequestState = initialState.signUpRequestState;
      state.signUpFormValues = initialState.signUpFormValues;
      state.tokenValidityTime = initialState.tokenValidityTime;
    },
  },
});

export const {
  setPhoneNumber,
  setSendVerificationCodeRequestState,
  setSignUpRequestState,
  setSignUpFormValues,
  setCountdownTokenValidityTime,
  setClearSignUpData,
} = signUpSlice.actions;

export const selectPhoneNumber = (state: RootState) => state.signUp.phoneNumber;
export const selectSendVerificationCodeRequestState = (state: RootState) =>
  state.signUp.sendVerificationCodeRequestState;
export const selectSignUpRequestState = (state: RootState) =>
  state.signUp.signUpRequestState;
export const selectSignUpState = (state: RootState) => state.signUp;

const persistConfig = {
  key: ReducerKeys.SIGN_UP,
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, signUpSlice.reducer);

export default persistedReducer;
