import { SignUpFormKeys } from "sign-up/enums/sign-up-form-keys";

export type SignUpFormType = {
  [SignUpFormKeys.FIRST_NAME]: string;
  [SignUpFormKeys.LAST_NAME]: string;
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
  [SignUpFormKeys.CONFIRM_PASSWORD]: string;
};
