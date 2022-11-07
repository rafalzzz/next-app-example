import { PathParams, rest } from "msw";
import { setupServer } from "msw/lib/node";
import { SignInRequest } from "sign-in/types";
import { generateResponseMessage } from "helpers/generate-response-message";
import { SharedResponse } from "types/response";
import { REQUEST_URLS } from "consts/request-urls";
import { USER_DOES_NOT_EXIST_MESSAGE } from "pages/api/sign-in/consts";

export const SIGN_IN_SUCCESS = generateResponseMessage(
  USER_DOES_NOT_EXIST_MESSAGE
);

export const endpoint = `${process.env.API_URL}/api${REQUEST_URLS.SIGN_IN}`;

const handlers = [
  rest.get<SignInRequest, PathParams, SharedResponse>(
    endpoint,
    (req, res, ctx) => {
      console.log({ req });

      return res(
        ctx.status(200),
        ctx.json(generateResponseMessage(USER_DOES_NOT_EXIST_MESSAGE))
      );
    }
  ),
];

export const server = setupServer(...handlers);
