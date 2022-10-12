import { InputTypes } from "shared/enums/input-type";
import { useForm } from "react-hook-form";

import { GenerateForm } from "shared/components/generate-form";
import { FormField } from "types/form-field";

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

const SIGN_UP_FORM_FIELDS: FormField[] = [
  { type: InputTypes.TEXT, key: SignUpFormKeys.LOGIN, label: SignUpFormLabels.LOGIN },
  { type: InputTypes.PASSWORD, key: SignUpFormKeys.PASSWORD, label: SignUpFormLabels.PASSWORD },
];

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();

  const onSubmit = (formData: SignUpForm) => console.log({ formData });

  return (
    <GenerateForm<SignUpForm>
      formFields={SIGN_UP_FORM_FIELDS}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
