import { SignUpFormKeys } from "sign-up/enums";

export type SignUpFormType = {
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
  [SignUpFormKeys.CONFIRM_PASSWORD]: string;
};

export type SendVerificationCodeRequest = {
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
};

export type SignUpRequest = {
  user_data: SendVerificationCodeRequest;
  code: string;
};
