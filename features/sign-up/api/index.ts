import { toast } from "react-toastify";
import { SendVerificationCodeRequest, SignUpRequest } from "sign-up/types";
import { toggleModal } from "store/modal";
import {
  setSendVerificationCodeRequestState,
  setSignUpRequestState,
} from "store/sign-up";
import { displayErrorMessage } from "helpers/display-error-message";
import { SharedResponse } from "types/response";
import { RequestState } from "enums/request-state";
import { REQUEST_URLS } from "consts/request-urls";
import { apiSlice } from "../../../store/api-slice";

export const signUpApi = apiSlice.injectEndpoints({
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
    signUp: build.mutation<SharedResponse, SignUpRequest>({
      query(body) {
        return {
          url: REQUEST_URLS.SIGN_UP,
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
          dispatch(toggleModal());
        } catch (error) {
          displayErrorMessage(error);
          dispatch(setSignUpRequestState(RequestState.ERROR));
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSendVerificationCodeMutation, useSignUpMutation } = signUpApi;
