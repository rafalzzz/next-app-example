import { PathParams, rest } from "msw";
import { CORRECT_EMAIL } from "sign-in/consts/emails";
import * as C from "sign-in/consts/messages";
import { SignInRequest } from "sign-in/types";
import { generateResponseMessage } from "helpers/generate-response-message";
import { SharedResponse } from "types/response";
import { REQUEST_URLS } from "consts/request-urls";

export const endpoint = `${process.env.API_URL}/api${REQUEST_URLS.SIGN_IN}`;

export const handlers = [
  rest.post<{ data: SignInRequest }, PathParams, SharedResponse>(
    endpoint,
    ({ body }, res, ctx) => {
      const { email } = body.data;

      if (email === CORRECT_EMAIL) {
        return res(
          ctx.delay(2000),
          ctx.status(200),
          ctx.json(generateResponseMessage(C.SIGNED_IN_SUCCESS_MESSAGE))
        );
      }

      return res(
        ctx.status(400),
        ctx.json(generateResponseMessage(C.USER_DOES_NOT_EXIST_MESSAGE))
      );
    }
  ),
];
