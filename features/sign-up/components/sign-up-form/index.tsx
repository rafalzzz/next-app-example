import { useHandleFormData } from "shared/hooks/use-handle-form-data";
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

enum SignUpFormLabels {
  LOGIN = "Login",
  PASSWORD = "Password",
}

const SIGN_IN_BUTTON_VALUE = "Sign in";

const SIGN_UP_FORM_FIELDS = [
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.LOGIN,
    label: SignUpFormLabels.LOGIN,
    validationRules: {
      required: "Login is required",
    },
  },
  {
    type: InputTypes.PASSWORD,
    key: SignUpFormKeys.PASSWORD,
    label: SignUpFormLabels.PASSWORD,
    validationRules: {
      required: "Password is required",
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
