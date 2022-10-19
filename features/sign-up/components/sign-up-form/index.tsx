import { useSignUpFormData } from "sign-up/hooks";
import { GenerateForm } from "components/.";
import { SignUpFormType } from "sign-up/types";

const SIGN_UP_BUTTON_VALUE = "Sign up!";

export const SignUpForm = () => {
  const { control, formFields, onSubmit } = useSignUpFormData();

  return (
    <GenerateForm<SignUpFormType>
      formFields={formFields}
      control={control}
      buttonValue={SIGN_UP_BUTTON_VALUE}
      handleSubmit={onSubmit}
    />
  );
};
