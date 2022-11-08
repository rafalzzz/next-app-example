import { GenerateForm } from "components/.";
import { useSignInFormData } from "sign-in/hooks";
import { SignInRequest } from "sign-in/types/.";
import { selectSignInRequestState } from "store/sign-in";
import { useAppSelector } from "hooks/redux-hooks";
import { RequestState } from "enums/request-state";
import { SIGN_IN } from "consts/form-test-ids";

const SIGN_IN_BUTTON_VALUE = "Sign in";
const BUTTON_VALUE_WHEN_LOADING = "Signing in ...";

export const SignInForm = () => {
  const { formFields, onSubmit } = useSignInFormData();

  const signInRequestStatus = useAppSelector(selectSignInRequestState);
  const isLoading = signInRequestStatus === RequestState.LOADING;

  return (
    <GenerateForm<SignInRequest>
      formFields={formFields}
      buttonValue={isLoading ? BUTTON_VALUE_WHEN_LOADING : SIGN_IN_BUTTON_VALUE}
      handleSubmit={onSubmit}
      disableSubmitButton={isLoading}
      testId={SIGN_IN}
    />
  );
};
