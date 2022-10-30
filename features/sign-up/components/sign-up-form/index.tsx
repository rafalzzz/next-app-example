import { GenerateForm } from "components/.";
import { useSignUpFormData } from "sign-up/hooks";
import { SignUpRequest } from "sign-up/types";

const SIGN_UP_BUTTON_VALUE = "Sign up!";

export const SignUpForm = () => {
  const { formFields, disableSubmitButton, onSubmit } = useSignUpFormData();

  return (
    <GenerateForm<SignUpRequest>
      formFields={formFields}
      buttonValue={SIGN_UP_BUTTON_VALUE}
      disableSubmitButton={disableSubmitButton}
      handleSubmit={onSubmit}
    />
  );
};
