import { SignInRequest } from "sign-in/types";
import { apiSlice } from "store/api-slice";
import { SharedResponse } from "types/.";
import { REQUEST_URLS } from "consts/request-urls";

const signInApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SharedResponse, SignInRequest>({
      query(body) {
        return {
          url: REQUEST_URLS.SIGN_IN,
          method: "post",
          data: { data: body },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = signInApi;
