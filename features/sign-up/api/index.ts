import { apiSlice } from "../../../store/api-slice";
import { REQUEST_URLS } from "consts/request-urls";
import {
  SendVerificationCodeRequest,
  SignUpRequest,
  VerifyPhoneNumberRequest,
} from "sign-up/types";
import { SharedResponse } from "types/response";
import {
  setSendVerificationCodeRequestState,
  setVerifyPhoneNumberRequestState,
} from "store/sign-up";
import { RequestState } from "enums/request-state";
import { toggleModal } from "store/modal";
import { displayErrorMessage } from "helpers/display-error-message";

const signUpApi = apiSlice.injectEndpoints({
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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setSendVerificationCodeRequestState(RequestState.LOADING));
        try {
          await queryFulfilled;
          dispatch(setSendVerificationCodeRequestState(RequestState.SUCCESS));
          dispatch(toggleModal());
        } catch (error) {
          displayErrorMessage(error);
          dispatch(setSendVerificationCodeRequestState(RequestState.ERROR));
        }
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
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          dispatch(setVerifyPhoneNumberRequestState(RequestState.LOADING));
          try {
            await queryFulfilled;
            dispatch(setVerifyPhoneNumberRequestState(RequestState.SUCCESS));
            dispatch(toggleModal());
          } catch (error) {
            displayErrorMessage(error);
            dispatch(setVerifyPhoneNumberRequestState(RequestState.ERROR));
          }
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
