import { PathParams, rest } from "msw";
import { setupServer } from "msw/node";
import { USER_DOES_NOT_EXIST_MESSAGE } from "sign-in/consts";
import * as C from "sign-in/consts";
import { SignInRequest } from "sign-in/types";
import { generateResponseMessage } from "helpers/generate-response-message";
import { SharedResponse } from "types/response";
import { REQUEST_URLS } from "consts/request-urls";
import { CORRECT_EMAIL } from "./consts";

export const SIGN_IN_SUCCESS = generateResponseMessage(
  USER_DOES_NOT_EXIST_MESSAGE
);

export const endpoint = `${process.env.API_URL}/api${REQUEST_URLS.SIGN_IN}`;

const handlers = [
  rest.post<{ data: SignInRequest }, PathParams, SharedResponse>(
    endpoint,
    ({ body }, res, ctx) => {
      const { email } = body.data;

      if (email === CORRECT_EMAIL) {
        return res(
          ctx.status(200),
          ctx.json(generateResponseMessage(C.SIGNED_IN_SUCCESS_MESSAGE))
        );
      }
    }
  ),
];

export const server = setupServer(...handlers);
