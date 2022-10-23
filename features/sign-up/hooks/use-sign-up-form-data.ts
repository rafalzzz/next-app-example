import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "hooks/.";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "helpers/.";
import { selectSendVerificationCodeRequestState } from "store/sign-up";
import { useSendVerificationCodeMutation } from "api/sign-up";
import * as REGEX from "consts/regex";
import { SignUpFormType } from "sign-up/types";
import { Comparison, InputTypes, RequestState } from "enums/.";
import { SignUpFormKeys } from "sign-up/enums";

const DEFAULT_VALUES = {
  [SignUpFormKeys.FIRST_NAME]: "",
  [SignUpFormKeys.LAST_NAME]: "",
  [SignUpFormKeys.PHONE_NUMBER]: "",
  [SignUpFormKeys.PASSWORD]: "",
  [SignUpFormKeys.CONFIRM_PASSWORD]: "",
};

// Replace control with register
export const useSignUpFormData = () => {
  const {
    control,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormType>({ defaultValues: DEFAULT_VALUES });

  const [sendVerificationCode] = useSendVerificationCodeMutation();

  const sendVerificationCodeRequestState = useAppSelector(
    selectSendVerificationCodeRequestState
  );

  const phoneNumber = getValues(SignUpFormKeys.PHONE_NUMBER);
  const phoneNumberIsNotFilled = phoneNumber.includes("_");

  const phoneNumberButtonText =
    sendVerificationCodeRequestState === RequestState.SUCCESS
      ? "Verified"
      : "Verify";

  const onClick = useCallback(() => {
    sendVerificationCode({ phoneNumber });
  }, [phoneNumber, sendVerificationCode]);

  const FORM_FIELDS = useMemo(
    () => [
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
        buttonText: phoneNumberButtonText,
        disabled: !phoneNumber || phoneNumberIsNotFilled,
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
    ],
    [
      errors,
      phoneNumber,
      phoneNumberButtonText,
      phoneNumberIsNotFilled,
      onClick,
      watch,
    ]
  );

  const onSubmit = (formData: SignUpFormType) => console.log({ formData });

  return {
    formFields: FORM_FIELDS,
    control,
    onSubmit: handleSubmit(onSubmit),
  };
};
