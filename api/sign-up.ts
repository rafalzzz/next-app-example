import { toast } from "react-toastify";
import { api } from "./api";
import { toggleModal } from "store/modal";
import { setSendVerificationCodeRequestState } from "store/sign-up";
import { RequestState } from "enums/.";

type SendVerificationCodeResponse = {
  message: string;
};

const signUpApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendVerificationCode: build.mutation<
      SendVerificationCodeResponse,
      {
        phoneNumber: string;
      }
    >({
      query(body) {
        const { phoneNumber } = body;

        return {
          url: `/send-verifiaction-code`,
          method: "post",
          data: { phone_number: phoneNumber },
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
          toast.error("Something went wrong.");
        }
      },
    }),
    /* verifyPhoneNumber: build.mutation<
      VerifyPhoneNumberResponse,
      {
        campaignId: string;
        customerId: number;
        data: HistoryLogTableDataWithoutChangedBy;
      }
    >({
      query(body) {
        const { campaignId, customerId, data } = body;

        return {
          url: `/v1/history_log`,
          method: "post",
          data: { data: [data] },
          params: {
            campaign_id: campaignId,
            customer_id: customerId,
          },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setActionRequestState(RequestState.LOADING));
        try {
          await queryFulfilled;
          dispatch(setActionRequestState(RequestState.SUCCESS));
          toast.success("Action successfully carried out");
        } catch (err) {
          dispatch(setActionRequestState(RequestState.ERROR));
          toast.error("Action performed with error");
        }
      },
      invalidatesTags: [{ type: LogHistoryTags.ITEM, id: LogHistoryTags.LIST }],
    }), */
  }),
  overrideExisting: false,
});

export const { useSendVerificationCodeMutation } = signUpApi;
