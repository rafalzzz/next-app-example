import { useForm } from "react-hook-form";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "helpers/.";
import { SignInFormType } from "sign-in/types";
import { InputTypes } from "enums/.";
import { SignInFormKeys } from "sign-in/enums";

const DEFAULT_VALUES = {
  [SignInFormKeys.LOGIN]: "",
  [SignInFormKeys.PASSWORD]: "",
};

export const useSignInFormData = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>({ defaultValues: DEFAULT_VALUES });

  const FORM_FIELDS = [
    {
      type: InputTypes.TEXT,
      key: SignInFormKeys.LOGIN,
      label: capitalizeFirstLetter(SignInFormKeys.LOGIN),
      isValueIncorrect: !!errors[SignInFormKeys.LOGIN],
      error: errors[SignInFormKeys.LOGIN]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignInFormKeys.LOGIN),
      },
    },
    {
      type: InputTypes.PASSWORD,
      key: SignInFormKeys.PASSWORD,
      label: capitalizeFirstLetter(SignInFormKeys.PASSWORD),
      isValueIncorrect: !!errors[SignInFormKeys.PASSWORD],
      error: errors[SignInFormKeys.PASSWORD]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignInFormKeys.PASSWORD),
      },
      showHyperlink: true,
    },
  ];

  const onSubmit = (formData: SignInFormType) => console.log({ formData });

  return {
    formFields: FORM_FIELDS,
    control,
    onSubmit: handleSubmit(onSubmit),
  };
};
