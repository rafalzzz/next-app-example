import { SignInFormKeys } from "sign-in/enums";

export type SignInFormType = {
  [SignInFormKeys.LOGIN]: string;
  [SignInFormKeys.PASSWORD]: string;
};
