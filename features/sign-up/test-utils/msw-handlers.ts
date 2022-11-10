import { PathParams, rest } from "msw";
import * as C from "sign-up/consts/messages";
import { CORRECT_PHONE } from "sign-up/consts/mocked_sign-up_data";
import { SendVerificationCodeRequest } from "sign-up/types";
import { generateResponseMessage } from "helpers/generate-response-message";
import { SharedResponse } from "types/response";
import { REQUEST_URLS } from "consts/request-urls";

export const endpoint = `${process.env.API_URL}/api${REQUEST_URLS.SEND_VERIFICATION_CODE}`;

export const handlers = [
  rest.post<{ data: SendVerificationCodeRequest }, PathParams, SharedResponse>(
    endpoint,
    ({ body }, res, ctx) => {
      const { phone } = body.data;

      if (phone === CORRECT_PHONE) {
        return res(
          ctx.delay(2000),
          ctx.status(200),
          ctx.json(generateResponseMessage(C.SIGNED_UP_SUCCESS_MESSAGE))
        );
      }

      return res(
        ctx.status(400),
        ctx.json(
          generateResponseMessage(C.PHONE_NUMBER_IS_ALREADY_TAKEN_MESSAGE)
        )
      );
    }
  ),
];
