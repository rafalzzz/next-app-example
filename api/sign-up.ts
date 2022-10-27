import { api } from "./api";
import {
  SendVerificationCodeRequest,
  SignUpRequest,
  VerifyPhoneNumberRequest,
} from "sign-up/types";
import { SharedResponse } from "types/response";

const signUpApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendVerificationCode: build.mutation<
      SharedResponse,
      SendVerificationCodeRequest
    >({
      query(body) {
        return {
          url: `/send-verifiaction-code`,
          method: "post",
          data: { data: body },
        };
      },
    }),
    verifyPhoneNumber: build.mutation<SharedResponse, VerifyPhoneNumberRequest>(
      {
        query(body) {
          return {
            url: `/v1/verify-phone-number`,
            method: "post",
            data: { data: body },
          };
        },
      }
    ),
    signUp: build.mutation<SharedResponse, SignUpRequest>({
      query(body) {
        return {
          url: `/v1/sign-up`,
          method: "post",
          data: { data: body },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendVerificationCodeMutation,
  useVerifyPhoneNumberMutation,
  useSignUpMutation,
} = signUpApi;
