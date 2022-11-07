import { SignInRequest } from "sign-in/types";
import { apiSlice } from "store/api-slice";
import { setSignInRequestState } from "store/sign-in";
import { displayErrorMessage } from "helpers/display-error-message";
import { SharedResponse } from "types/.";
import { RequestState } from "enums/request-state";
import { REQUEST_URLS } from "consts/request-urls";

export const signInApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SharedResponse, SignInRequest>({
      query(body) {
        return {
          url: REQUEST_URLS.SIGN_IN,
          method: "post",
          data: { data: body },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setSignInRequestState(RequestState.LOADING));
        try {
          await queryFulfilled;
          dispatch(setSignInRequestState(RequestState.SUCCESS));
        } catch (error) {
          displayErrorMessage(error);
          dispatch(setSignInRequestState(RequestState.ERROR));
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = signInApi;
