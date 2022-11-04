import { SignUpFormKeys } from "sign-up/enums";

export type SignUpFormType = {
  [SignUpFormKeys.FIRST_NAME]: string;
  [SignUpFormKeys.LAST_NAME]: string;
  [SignUpFormKeys.EMAIL]: string;
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
  [SignUpFormKeys.CONFIRM_PASSWORD]: string;
};

export type SendVerificationCodeRequest = {
  [SignUpFormKeys.EMAIL]: string;
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
};

export type SignUpRequest = {
  user_data: Omit<SignUpFormType, SignUpFormKeys.CONFIRM_PASSWORD>;
  token: string;
};
