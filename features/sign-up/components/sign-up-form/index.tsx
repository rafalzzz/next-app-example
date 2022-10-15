import { useHandleFormData } from "shared/hooks/use-handle-form-data";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "shared/helpers";
import { GenerateForm } from "shared/components/generate-form";
import { InputTypes } from "shared/enums/input-type";

export type SignUpForm = {
  login: string;
  password: string;
};

enum SignUpFormKeys {
  LOGIN = "login",
  PASSWORD = "password",
}

const SIGN_IN_BUTTON_VALUE = "Sign in";

const SIGN_UP_FORM_FIELDS = [
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.LOGIN,
    label: capitalizeFirstLetter(SignUpFormKeys.LOGIN),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.LOGIN),
    },
  },
  {
    type: InputTypes.PASSWORD,
    key: SignUpFormKeys.PASSWORD,
    label: capitalizeFirstLetter(SignUpFormKeys.PASSWORD),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.PASSWORD),
    },
  },
];

export const SignUpForm = () => {
  const { extendedFormFields, handleSubmit } = useHandleFormData<SignUpForm>({
    formFields: SIGN_UP_FORM_FIELDS,
  });

  const onSubmit = (formData: SignUpForm) => console.log({ formData });

  return (
    <GenerateForm
      formFields={extendedFormFields}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
