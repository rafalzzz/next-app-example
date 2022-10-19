import { SignInFormKeys } from "sign-in/enums/sign-in-form-keys";

export type SignInFormType = {
  [SignInFormKeys.LOGIN]: string;
  [SignInFormKeys.PASSWORD]: string;
};
