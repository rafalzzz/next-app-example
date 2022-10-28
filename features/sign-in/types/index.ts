import { SignInFormKeys } from "sign-in/enums";

export type SignInRequest = {
  [SignInFormKeys.LOGIN]: string;
  [SignInFormKeys.PASSWORD]: string;
};
