import { useForm } from "react-hook-form";
import { useSignInMutation } from "sign-in/api";
import * as C from "sign-in/consts/errors";
import { SignInFormKeys } from "sign-in/enums";
import { SignInRequest } from "sign-in/types";
import { encryptPassword, generateMessageFieldIsRequired } from "helpers/.";
import { InputTypes } from "enums/.";
import { EMAIL_VALIDATION } from "consts/regex";

const DEFAULT_VALUES = {
  [SignInFormKeys.EMAIL]: "",
  [SignInFormKeys.PASSWORD]: "",
};

export const useSignInFormData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({ defaultValues: DEFAULT_VALUES });

  const [signIn] = useSignInMutation();

  const FORM_FIELDS = [
    {
      type: InputTypes.TEXT,
      key: SignInFormKeys.EMAIL,
      register: register(SignInFormKeys.EMAIL, {
        required: generateMessageFieldIsRequired(SignInFormKeys.EMAIL),
        pattern: {
          value: EMAIL_VALIDATION,
          message: C.INVALID_EMAIL_MESSAGE,
        },
      }),
      isValueIncorrect: !!errors[SignInFormKeys.EMAIL],
      error: errors[SignInFormKeys.EMAIL]?.message,
    },
    {
      type: InputTypes.PASSWORD,
      key: SignInFormKeys.PASSWORD,
      register: register(SignInFormKeys.PASSWORD, {
        required: generateMessageFieldIsRequired(SignInFormKeys.PASSWORD),
        validate: (value) =>
          value.length < 6 ? C.SHORT_PASSWORD_MESSAGE : undefined,
      }),
      isValueIncorrect: !!errors[SignInFormKeys.PASSWORD],
      error: errors[SignInFormKeys.PASSWORD]?.message,
      passwordFieldProps: {
        showHyperlink: true,
      },
    },
  ];

  const onSubmit = async ({ email, password }: SignInRequest) => {
    const encryptedPassword = encryptPassword(password);

    signIn({ email, password: encryptedPassword });
  };

  return {
    formFields: FORM_FIELDS,
    onSubmit: handleSubmit(onSubmit),
  };
};
