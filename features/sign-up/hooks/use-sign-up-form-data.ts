import { useForm } from "react-hook-form";
import { useAppDispatch } from "hooks/.";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "helpers/.";
import { handleModal } from "store/sign-up";
import * as REGEX from "consts/regex";
import { SignUpFormType } from "sign-up/types";
import { Comparison, InputTypes } from "enums/.";
import { SignUpFormKeys } from "sign-up/enums";

const DEFAULT_VALUES = {
  [SignUpFormKeys.FIRST_NAME]: "",
  [SignUpFormKeys.LAST_NAME]: "",
  [SignUpFormKeys.PHONE_NUMBER]: "",
  [SignUpFormKeys.PASSWORD]: "",
  [SignUpFormKeys.CONFIRM_PASSWORD]: "",
};

export const useSignUpFormData = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({ defaultValues: DEFAULT_VALUES });

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(handleModal(true));
  };

  const FORM_FIELDS = [
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.FIRST_NAME,
      label: capitalizeFirstLetter(SignUpFormKeys.FIRST_NAME),
      isValueIncorrect: !!errors[SignUpFormKeys.FIRST_NAME],
      error: errors[SignUpFormKeys.FIRST_NAME]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.FIRST_NAME),
        pattern: {
          value: REGEX.FIRST_NAME_VALIDATION,
          message: "Invalid first name",
        },
      },
    },
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.LAST_NAME,
      label: capitalizeFirstLetter(SignUpFormKeys.LAST_NAME),
      isValueIncorrect: !!errors[SignUpFormKeys.LAST_NAME],
      error: errors[SignUpFormKeys.LAST_NAME]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.LAST_NAME),
        pattern: {
          value: REGEX.LAST_NAME_VALIDATION,
          message: "Invalid last name",
        },
      },
    },
    {
      type: InputTypes.NUMBER_WITH_MASK,
      key: SignUpFormKeys.PHONE_NUMBER,
      label: capitalizeFirstLetter(SignUpFormKeys.PHONE_NUMBER),
      isValueIncorrect: !!errors[SignUpFormKeys.PHONE_NUMBER],
      error: errors[SignUpFormKeys.PHONE_NUMBER]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
        pattern: {
          value: REGEX.STRING_INCLUDES_UNDERSCORE_SIGN,
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
      isValueIncorrect: !!errors[SignUpFormKeys.PASSWORD],
      error: errors[SignUpFormKeys.PASSWORD]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PASSWORD),
      },
    },
    {
      type: InputTypes.PASSWORD,
      key: SignUpFormKeys.CONFIRM_PASSWORD,
      label: capitalizeFirstLetter(SignUpFormKeys.CONFIRM_PASSWORD),
      isValueIncorrect: !!errors[SignUpFormKeys.CONFIRM_PASSWORD],
      error: "Passwords do not match",
      linkedFields: {
        field: InputTypes.PASSWORD,
        comparison: Comparison.EQUAL,
      },
      validationRules: {
        required: generateMessageFieldIsRequired(
          SignUpFormKeys.CONFIRM_PASSWORD
        ),
        validate: (value: string) => value === watch(SignUpFormKeys.PASSWORD),
      },
    },
  ];

  const onSubmit = (formData: SignUpFormType) => console.log({ formData });

  return {
    formFields: FORM_FIELDS,
    control,
    onSubmit: handleSubmit(onSubmit),
  };
};
