import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestState } from "enums/.";
import type { RootState } from "store";

interface SignInState {
  signInRequestState: RequestState;
}

const initialState: SignInState = {
  signInRequestState: RequestState.IDLE,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    setSignInRequestState: (state, action: PayloadAction<RequestState>) => {
      state.signInRequestState = action.payload;
    },
  },
});

export const { setSignInRequestState } = signInSlice.actions;

export const selectSignInRequestState = (state: RootState) => state.signUp.signUpRequestState;

export default signInSlice.reducer;
