import { useSignInFormData } from "sign-in/hooks";
import { GenerateForm } from "components/.";
import { SignInRequest } from "sign-in/types/.";

const SIGN_IN_BUTTON_VALUE = "Sign in";

export const SignInForm = () => {
  const { formFields, onSubmit } = useSignInFormData();

  return (
    <GenerateForm<SignInRequest>
      formFields={formFields}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={onSubmit}
    />
  );
};
