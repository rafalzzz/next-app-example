import { GenerateForm } from "components/.";
import { useSignUpFormData } from "sign-up/hooks";
import { SignUpFormType } from "sign-up/types";
import { selectSignUpRequestState } from "store/sign-up";
import { useAppSelector } from "hooks/redux-hooks";
import { RequestState } from "enums/request-state";
import { SIGN_UP } from "consts/form-test-ids";

const SIGN_UP_BUTTON_VALUE = "Sign up!";

export const SignUpForm = () => {
  const { formFields, onSubmit } = useSignUpFormData();

  const signUpRequestStatus = useAppSelector(selectSignUpRequestState);
  const isLoading = signUpRequestStatus === RequestState.LOADING;

  return (
    <GenerateForm<SignUpFormType>
      formFields={formFields}
      buttonValue={SIGN_UP_BUTTON_VALUE}
      disableSubmitButton={isLoading}
      handleSubmit={onSubmit}
      testId={SIGN_UP}
    />
  );
};
