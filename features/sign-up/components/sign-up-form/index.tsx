import { useHandleFormData } from "hooks/use-handle-form-data";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "helpers/.";
import { GenerateForm } from "components/generate-form";
import { InputTypes } from "enums/input-types";
import { useAppDispatch } from "hooks/redux-hooks";
import { handleModal } from "store/sign-up";

export type SignUpFormType = {
  firstName: string;
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

const SIGN_UP_FORM_FIELDS = (onClick: () => void) => [
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
    type: InputTypes.NUMBER_WITH_MASK,
    key: SignUpFormKeys.PHONE_NUMBER,
    label: capitalizeFirstLetter(SignUpFormKeys.PHONE_NUMBER),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
    },
    format: "+ 48 ### ### ###",
    allowEmptyFormatting: true,
    mask: "_",
    onClick,
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
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(handleModal(true));
  };

  const { extendedFormFields, control, handleSubmit } =
    useHandleFormData<SignUpFormType>({
      formFields: SIGN_UP_FORM_FIELDS(onClick),
    });

  const onSubmit = (formData: SignUpFormType) => console.log({ formData });

  return (
    <GenerateForm<SignUpFormType>
      formFields={extendedFormFields}
      control={control}
      buttonValue={SIGN_UP_BUTTON_VALUE}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};
