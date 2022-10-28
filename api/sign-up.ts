import { api } from "./api";
import { REQUEST_URLS } from "consts/request-urls";
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
          url: REQUEST_URLS.SEND_VERIFICATION_CODE,
          method: "post",
          data: { data: body },
        };
      },
    }),
    verifyPhoneNumber: build.mutation<SharedResponse, VerifyPhoneNumberRequest>(
      {
        query(body) {
          return {
            url: REQUEST_URLS.VERIFY_PHONE_NUMBER,
            method: "post",
            data: { data: body },
          };
        },
      }
    ),
    signUp: build.mutation<SharedResponse, SignUpRequest>({
      query(body) {
        return {
          url: REQUEST_URLS.SIGN_UP,
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
