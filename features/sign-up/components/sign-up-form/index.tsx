import { InputTypes } from "shared/enums/input-type";
import { FieldErrorsImpl, useForm, UseFormRegister } from "react-hook-form";

import { GenerateForm } from "shared/components/generate-form";

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

const SIGN_UP_FORM_FIELDS = (
  register: UseFormRegister<SignUpForm>,
  errors: Partial<FieldErrorsImpl<SignUpForm>>
) => [
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.LOGIN,
    label: SignUpFormLabels.LOGIN,
    register: register(SignUpFormKeys.LOGIN, {
      required: "Login is required",
    }),
    error: errors[SignUpFormKeys.LOGIN]?.message,
  },
  {
    type: InputTypes.PASSWORD,
    key: SignUpFormKeys.PASSWORD,
    label: SignUpFormLabels.PASSWORD,
    register: register(SignUpFormKeys.PASSWORD, {
      required: "Password is required",
    }),
    error: errors[SignUpFormKeys.PASSWORD]?.message,
  },
];

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = (formData: SignUpForm) => console.log({ formData });

  return (
    <GenerateForm
      formFields={SIGN_UP_FORM_FIELDS(register, errors)}
      buttonValue={SIGN_IN_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
