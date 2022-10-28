import { SignUpFormKeys, VerifyPhoneNumberKeys } from "sign-up/enums";

export type SignUpRequest = {
  [SignUpFormKeys.FIRST_NAME]: string;
  [SignUpFormKeys.LAST_NAME]: string;
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
  [SignUpFormKeys.CONFIRM_PASSWORD]: string;
};

export type SendVerificationCodeRequest = {
  [SignUpFormKeys.PHONE_NUMBER]: string;
};

export type VerifyPhoneNumberRequest = {
  [VerifyPhoneNumberKeys.CODE]: string;
  [SignUpFormKeys.PHONE_NUMBER]: string;
};
