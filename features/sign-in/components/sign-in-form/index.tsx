import { useSignInFormData } from "sign-in/hooks";
import { GenerateForm } from "components/.";
import { SignInFormType } from "sign-in/types";

const SIGN_IN_BUTTON_VALUE = "Sign in";

export const SignInForm = () => {
  const { control, formFields, onSubmit } = useSignInFormData();

  return (
    <GenerateForm<SignInFormType>
      formFields={formFields}
      control={control}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={onSubmit}
    />
  );
};
