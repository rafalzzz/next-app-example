import { PathParams, rest } from "msw";
import { CORRECT_EMAIL } from "sign-up/consts/emails";
import * as C from "sign-up/consts/messages";
import { SignUpRequest } from "sign-up/types";
import { generateResponseMessage } from "helpers/generate-response-message";
import { SharedResponse } from "types/response";
import { REQUEST_URLS } from "consts/request-urls";

export const endpoint = `${process.env.API_URL}/api${REQUEST_URLS.SIGN_UP}`;

export const handlers = [
  rest.post<{ data: SignUpRequest }, PathParams, SharedResponse>(
    endpoint,
    ({ body }, res, ctx) => {
      const { email } = body.data.user_data;

      if (email === CORRECT_EMAIL) {
        return res(
          ctx.delay(2000),
          ctx.status(200),
          ctx.json(generateResponseMessage(C.SIGNED_UP_SUCCESS_MESSAGE))
        );
      }

      return res(
        ctx.status(400),
        ctx.json(generateResponseMessage(C.EMAIL_IS_ALREADY_TAKEN_MESSAGE))
      );
    }
  ),
];
