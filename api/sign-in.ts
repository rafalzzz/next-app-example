import { toast } from "react-toastify";
import { api } from "./api";
import { setSignInRequestState } from "store/sign-in";
import { SignInRequest } from "sign-in/types";
import { SharedResponse } from "types/.";
import { RequestState } from "enums/.";

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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setSignInRequestState(RequestState.LOADING));
        try {
          const {
            data: { message },
          } = await queryFulfilled;
          dispatch(setSignInRequestState(RequestState.SUCCESS));
          toast.success(message);
        } catch (err) {
          dispatch(setSignInRequestState(RequestState.ERROR));
          toast.error("Something went wrong");
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = signInApi;
