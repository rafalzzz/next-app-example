import { useHandleFormData } from "shared/hooks/use-handle-form-data";
import { capitalizeFirstLetter, generateMessageFieldIsRequired } from "shared/helpers";
import { GenerateForm } from "components/.";
import { InputTypes } from "enums/input-types";

export type SignInFormType = {
  login: string;
  password: string;
};

enum SignInFormKeys {
  LOGIN = "login",
  PASSWORD = "password",
}

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
  const { extendedFormFields, handleSubmit } = useHandleFormData<SignInFormType>({
    formFields: SIGN_IN_FORM_FIELDS,
  });

  const onSubmit = (formData: SignInFormType) => console.log({ formData });

  return (
    <GenerateForm
      formFields={extendedFormFields}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
