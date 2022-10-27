import { api } from "./api";
import { SignInRequest } from "sign-in/types";
import { SharedResponse } from "types/.";

const signInApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SharedResponse, SignInRequest>({
      query(body) {
        return {
          url: `/v1/sign-in`,
          method: "post",
          data: { data: body },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = signInApi;
