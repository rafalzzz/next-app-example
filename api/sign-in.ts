import { api } from "./api";
import { REQUEST_URLS } from "consts/request-urls";
import { SignInRequest } from "sign-in/types";
import { SharedResponse } from "types/.";

const signInApi = api.injectEndpoints({
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
