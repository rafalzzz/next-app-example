import { useForm } from "react-hook-form";
import { capitalizeFirstLetter, generateMessageFieldIsRequired } from "helpers/.";
import { GenerateForm } from "components/.";
import { InputTypes } from "enums/.";

enum SignInFormKeys {
  LOGIN = "login",
  PASSWORD = "password",
}

export type SignInFormType = {
  [SignInFormKeys.LOGIN]: string;
  [SignInFormKeys.PASSWORD]: string;
};

const DEFAULT_VALUES = {
  [SignInFormKeys.LOGIN]: "",
  [SignInFormKeys.PASSWORD]: "",
};

const SIGN_IN_BUTTON_VALUE = "Sign in";

export const SignInForm = () => {
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
      error: errors[SignInFormKeys.LOGIN]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignInFormKeys.LOGIN),
      },
    },
    {
      type: InputTypes.PASSWORD,
      key: SignInFormKeys.PASSWORD,
      label: capitalizeFirstLetter(SignInFormKeys.PASSWORD),
      error: errors[SignInFormKeys.PASSWORD]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignInFormKeys.PASSWORD),
      },
      showHyperlink: true,
    },
  ];

  const onSubmit = (formData: SignInFormType) => console.log({ formData });

  return (
    <GenerateForm<SignInFormType>
      formFields={FORM_FIELDS}
      control={control}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
