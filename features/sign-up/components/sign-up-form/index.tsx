import { useEffect } from "react";
import { GenerateForm } from "components/.";
import { useRouter } from "next/router";
import { useSignUpFormData } from "sign-up/hooks";
import { SignUpFormType } from "sign-up/types";
import { selectSignUpRequestState } from "store/sign-up";
import { useAppSelector } from "hooks/redux-hooks";
import { Paths } from "enums/paths";
import { RequestState } from "enums/request-state";
import { SIGN_UP } from "consts/form-test-ids";

const SIGN_UP_BUTTON_VALUE = "Sign up!";

export const SignUpForm = () => {
  const { formFields, disableSubmitButton, onSubmit } = useSignUpFormData();

  const router = useRouter();
  const signUpRequestState = useAppSelector(selectSignUpRequestState);
  const requestIsSuccess = signUpRequestState === RequestState.SUCCESS;

  useEffect(() => {
    if (requestIsSuccess) {
      router.push(Paths.SIGN_IN);
    }
  }, [requestIsSuccess, router]);

  return (
    <GenerateForm<SignUpFormType>
      formFields={formFields}
      buttonValue={SIGN_UP_BUTTON_VALUE}
      disableSubmitButton={disableSubmitButton}
      handleSubmit={onSubmit}
      testId={SIGN_UP}
    />
  );
};
