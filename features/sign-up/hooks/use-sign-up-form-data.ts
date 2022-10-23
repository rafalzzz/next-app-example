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

export const useSignUpFormData = () => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormType>({ defaultValues: DEFAULT_VALUES });

  const [sendVerificationCode] = useSendVerificationCodeMutation();

  const sendVerificationCodeRequestState = useAppSelector(
    selectSendVerificationCodeRequestState
  );

  const phoneNumberButtonText =
    sendVerificationCodeRequestState === RequestState.SUCCESS
      ? "Verified"
      : "Verify";

  const onClick = async () => {
    const result = await trigger(SignUpFormKeys.PHONE_NUMBER);
    if (result) {
      const phoneNumber = getValues(SignUpFormKeys.PHONE_NUMBER);
      sendVerificationCode({ phoneNumber });
    }
  };

  const FORM_FIELDS = [
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.FIRST_NAME,
      label: capitalizeFirstLetter(SignUpFormKeys.FIRST_NAME),
      register: register(SignUpFormKeys.FIRST_NAME, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.FIRST_NAME),
        pattern: {
          value: REGEX.FIRST_NAME_VALIDATION,
          message: "Invalid first name",
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.FIRST_NAME],
      error: errors[SignUpFormKeys.FIRST_NAME]?.message,
    },
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.LAST_NAME,
      label: capitalizeFirstLetter(SignUpFormKeys.LAST_NAME),
      register: register(SignUpFormKeys.LAST_NAME, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.LAST_NAME),
        pattern: {
          value: REGEX.LAST_NAME_VALIDATION,
          message: "Invalid last name",
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.LAST_NAME],
      error: errors[SignUpFormKeys.LAST_NAME]?.message,
    },
    {
      type: InputTypes.NUMBER_WITH_MASK,
      key: SignUpFormKeys.PHONE_NUMBER,
      label: capitalizeFirstLetter(SignUpFormKeys.PHONE_NUMBER),
      register: register(SignUpFormKeys.PHONE_NUMBER, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
        pattern: {
          value: REGEX.STRING_INCLUDES_UNDERSCORE_SIGN,
          message: "Enter correct phone number",
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.PHONE_NUMBER],
      error: errors[SignUpFormKeys.PHONE_NUMBER]?.message,
      format: "+ 48 ### ### ###",
      allowEmptyFormatting: true,
      mask: "_",
      buttonText: phoneNumberButtonText,
      onClick,
    },
    {
      type: InputTypes.PASSWORD,
      key: SignUpFormKeys.PASSWORD,
      label: capitalizeFirstLetter(SignUpFormKeys.PASSWORD),
      register: register(SignUpFormKeys.PASSWORD, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PASSWORD),
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.PASSWORD],
      error: errors[SignUpFormKeys.PASSWORD]?.message,
    },
    {
      type: InputTypes.PASSWORD,
      key: SignUpFormKeys.CONFIRM_PASSWORD,
      label: capitalizeFirstLetter(SignUpFormKeys.CONFIRM_PASSWORD),
      register: register(SignUpFormKeys.CONFIRM_PASSWORD, {
        required: generateMessageFieldIsRequired(
          SignUpFormKeys.CONFIRM_PASSWORD
        ),
        validate: {
          matchesPreviousPassword: (value) => {
            const passwordValue = getValues(SignUpFormKeys.PASSWORD);
            return passwordValue === value || "Passwords do not match";
          },
        },
      }),
      error: errors[SignUpFormKeys.CONFIRM_PASSWORD]?.message,
      isValueIncorrect: !!errors[SignUpFormKeys.CONFIRM_PASSWORD],
      linkedFields: {
        field: InputTypes.PASSWORD,
        comparison: Comparison.EQUAL,
      },
    },
  ];

  const onSubmit = (formData: SignUpFormType) => {
    console.log({ formData });
  };

  return {
    formFields: FORM_FIELDS,
    onSubmit: handleSubmit(onSubmit),
  };
};
