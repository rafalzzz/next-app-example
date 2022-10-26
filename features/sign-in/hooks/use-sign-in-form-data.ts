import { useForm } from "react-hook-form";
import { capitalizeFirstLetter, generateMessageFieldIsRequired } from "helpers/.";
import { useSignInMutation } from "api/sign-in";
import { SignInRequest } from "sign-in/types";
import { SignInFormKeys } from "sign-in/enums";
import { InputTypes } from "enums/.";

const DEFAULT_VALUES = {
  [SignInFormKeys.LOGIN]: "",
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
      key: SignInFormKeys.LOGIN,
      label: capitalizeFirstLetter(SignInFormKeys.LOGIN),
      register: register(SignInFormKeys.LOGIN, {
        required: generateMessageFieldIsRequired(SignInFormKeys.LOGIN),
      }),
      isValueIncorrect: !!errors[SignInFormKeys.LOGIN],
      error: errors[SignInFormKeys.LOGIN]?.message,
    },
    {
      type: InputTypes.PASSWORD,
      key: SignInFormKeys.PASSWORD,
      label: capitalizeFirstLetter(SignInFormKeys.PASSWORD),
      register: register(SignInFormKeys.PASSWORD, {
        required: generateMessageFieldIsRequired(SignInFormKeys.PASSWORD),
      }),
      isValueIncorrect: !!errors[SignInFormKeys.PASSWORD],
      error: errors[SignInFormKeys.PASSWORD]?.message,
      showHyperlink: true,
    },
  ];

  const onSubmit = (formData: SignInRequest) => {
    signIn(formData);
  };

  return {
    formFields: FORM_FIELDS,
    onSubmit: handleSubmit(onSubmit),
  };
};
