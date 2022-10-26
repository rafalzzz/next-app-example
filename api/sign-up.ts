import { toast } from "react-toastify";
import { api } from "./api";
import { toggleModal } from "store/modal";
import {
  setSendVerificationCodeRequestState,
  setSignUpRequestState,
  setVerifyPhoneNumberRequestState,
} from "store/sign-up";
import {
  SendVerificationCodeRequest,
  SignUpRequest,
  VerifyPhoneNumberRequest,
} from "sign-up/types";
import { SharedResponse } from "types/response";
import { RequestState } from "enums/.";

const signUpApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendVerificationCode: build.mutation<SharedResponse, SendVerificationCodeRequest>({
      query(body) {
        return {
          url: `/send-verifiaction-code`,
          method: "post",
          data: { data: body },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setSendVerificationCodeRequestState(RequestState.LOADING));
        try {
          await queryFulfilled;
          dispatch(setSendVerificationCodeRequestState(RequestState.SUCCESS));
          dispatch(toggleModal());
        } catch (err) {
          dispatch(setSendVerificationCodeRequestState(RequestState.ERROR));
          toast.error("Something went wrong");
        }
      },
    }),
    verifyPhoneNumber: build.mutation<SharedResponse, VerifyPhoneNumberRequest>({
      query(body) {
        return {
          url: `/v1/verify-phone-number`,
          method: "post",
          data: { data: body },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setVerifyPhoneNumberRequestState(RequestState.LOADING));
        try {
          const {
            data: { message },
          } = await queryFulfilled;
          dispatch(setVerifyPhoneNumberRequestState(RequestState.SUCCESS));
          toast.success(message);
        } catch (err) {
          dispatch(setVerifyPhoneNumberRequestState(RequestState.ERROR));
          toast.error("Something went wrong");
        }
      },
    }),
    signUp: build.mutation<SharedResponse, SignUpRequest>({
      query(body) {
        return {
          url: `/v1/sign-up`,
          method: "post",
          data: { data: body },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setSignUpRequestState(RequestState.LOADING));
        try {
          const {
            data: { message },
          } = await queryFulfilled;
          dispatch(setSignUpRequestState(RequestState.SUCCESS));
          toast.success(message);
        } catch (err) {
          dispatch(setSignUpRequestState(RequestState.ERROR));
          toast.error("Something went wrong");
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSendVerificationCodeMutation, useVerifyPhoneNumberMutation, useSignUpMutation } =
  signUpApi;
