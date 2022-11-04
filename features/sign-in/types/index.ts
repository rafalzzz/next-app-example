import { SignInFormKeys } from "sign-in/enums";

export type SignInRequest = {
  [SignInFormKeys.EMAIL]: string;
  [SignInFormKeys.PASSWORD]: string;
};
