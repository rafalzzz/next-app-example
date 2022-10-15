import { useHandleFormData } from "shared/hooks/use-handle-form-data";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "shared/helpers";
import { GenerateForm } from "shared/components/generate-form";
import { InputTypes } from "enums/input-types";

export type SignUpForm = {
  FIRST_NAME: string;
  password: string;
};

enum SignUpFormKeys {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  PHONE_NUMBER = "phone_number",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirm_password",
}

const SIGN_UP_BUTTON_VALUE = "Sign up!";

const SIGN_UP_FORM_FIELDS = [
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.FIRST_NAME,
    label: capitalizeFirstLetter(SignUpFormKeys.FIRST_NAME),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.FIRST_NAME),
    },
  },
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.LAST_NAME,
    label: capitalizeFirstLetter(SignUpFormKeys.LAST_NAME),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.LAST_NAME),
    },
  },
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.PHONE_NUMBER,
    label: capitalizeFirstLetter(SignUpFormKeys.PHONE_NUMBER),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
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
  {
    type: InputTypes.PASSWORD,
    key: SignUpFormKeys.CONFIRM_PASSWORD,
    label: capitalizeFirstLetter(SignUpFormKeys.CONFIRM_PASSWORD),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.CONFIRM_PASSWORD),
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
      buttonValue={SIGN_UP_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
