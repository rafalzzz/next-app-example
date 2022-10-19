import { useHandleFormData } from "hooks/.";
import { capitalizeFirstLetter, generateMessageFieldIsRequired } from "helpers/.";
import { GenerateForm } from "components/.";
import { InputTypes } from "enums/.";

export type SignInFormType = {
  login: string;
  password: string;
};

enum SignInFormKeys {
  LOGIN = "login",
  PASSWORD = "password",
}

const DEFAULT_VALUES = {
  [SignInFormKeys.LOGIN]: "",
  [SignInFormKeys.PASSWORD]: "",
};

const SIGN_IN_BUTTON_VALUE = "Sign in";

const SIGN_IN_FORM_FIELDS = [
  {
    type: InputTypes.TEXT,
    key: SignInFormKeys.LOGIN,
    label: capitalizeFirstLetter(SignInFormKeys.LOGIN),
    validationRules: {
      required: generateMessageFieldIsRequired(SignInFormKeys.LOGIN),
    },
  },
  {
    type: InputTypes.PASSWORD,
    key: SignInFormKeys.PASSWORD,
    label: capitalizeFirstLetter(SignInFormKeys.PASSWORD),
    validationRules: {
      required: generateMessageFieldIsRequired(SignInFormKeys.PASSWORD),
    },
    showHyperlink: true,
  },
];

export const SignInForm = () => {
  const { extendedFormFields, control, handleSubmit } = useHandleFormData<SignInFormType>({
    formFields: SIGN_IN_FORM_FIELDS,
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (formData: SignInFormType) => console.log({ formData });

  return (
    <GenerateForm<SignInFormType>
      formFields={extendedFormFields}
      control={control}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
