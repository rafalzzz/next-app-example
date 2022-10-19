import { useAppDispatch, useHandleFormData } from "hooks/.";
import { capitalizeFirstLetter, generateMessageFieldIsRequired } from "helpers/.";
import { handleModal } from "store/sign-up";
import { GenerateForm } from "components/.";
import {
  FIRST_NAME_VALIDATION,
  LAST_NAME_VALIDATION,
  PASSWORD_VALIDATION,
  STRING_INCLUDES_UNDERSCORE_SIGN,
} from "consts/validation";
import { Comparison, InputTypes } from "enums/.";

enum SignUpFormKeys {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  PHONE_NUMBER = "phone_number",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirm_password",
}

export type SignUpFormType = {
  [SignUpFormKeys.FIRST_NAME]: string;
  [SignUpFormKeys.LAST_NAME]: string;
  [SignUpFormKeys.PHONE_NUMBER]: string;
  [SignUpFormKeys.PASSWORD]: string;
  [SignUpFormKeys.CONFIRM_PASSWORD]: string;
};

const DEFAULT_VALUES = {
  [SignUpFormKeys.FIRST_NAME]: "",
  [SignUpFormKeys.LAST_NAME]: "",
  [SignUpFormKeys.PHONE_NUMBER]: "",
  [SignUpFormKeys.PASSWORD]: "",
  [SignUpFormKeys.CONFIRM_PASSWORD]: "",
};

const SIGN_UP_BUTTON_VALUE = "Sign up!";

const SIGN_UP_FORM_FIELDS = (onClick: () => void) => [
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.FIRST_NAME,
    label: capitalizeFirstLetter(SignUpFormKeys.FIRST_NAME),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.FIRST_NAME),
      pattern: {
        value: FIRST_NAME_VALIDATION,
        message: "Invalid first name",
      },
    },
  },
  {
    type: InputTypes.TEXT,
    key: SignUpFormKeys.LAST_NAME,
    label: capitalizeFirstLetter(SignUpFormKeys.LAST_NAME),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.LAST_NAME),
      pattern: {
        value: LAST_NAME_VALIDATION,
        message: "Invalid last name",
      },
    },
  },
  {
    type: InputTypes.NUMBER_WITH_MASK,
    key: SignUpFormKeys.PHONE_NUMBER,
    label: capitalizeFirstLetter(SignUpFormKeys.PHONE_NUMBER),
    validationRules: {
      required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
      pattern: {
        value: STRING_INCLUDES_UNDERSCORE_SIGN,
        message: "Enter correct phone number",
      },
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
      pattern: {
        value: PASSWORD_VALIDATION,
        message: "Invalid password",
      },
    },
  },
  {
    type: InputTypes.PASSWORD,
    key: SignUpFormKeys.CONFIRM_PASSWORD,
    label: capitalizeFirstLetter(SignUpFormKeys.CONFIRM_PASSWORD),
    linkedFields: {
      field: InputTypes.PASSWORD,
      comparison: Comparison.EQUAL,
    },
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

  const { extendedFormFields, control, handleSubmit } = useHandleFormData<SignUpFormType>({
    formFields: SIGN_UP_FORM_FIELDS(onClick),
    defaultValues: DEFAULT_VALUES,
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
