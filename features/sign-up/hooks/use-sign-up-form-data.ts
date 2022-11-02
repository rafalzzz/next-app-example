import { useForm } from "react-hook-form";
import { useSendVerificationCodeMutation } from "sign-up/api";
import { SignUpFormKeys } from "sign-up/enums";
import { SignUpFormType } from "sign-up/types";
import { setSignUpFormValues } from "store/sign-up";
import { useAppDispatch } from "hooks/.";
import {
  capitalizeFirstLetter,
  encryptPassword,
  generateMessageFieldIsRequired,
  removeUnderscore,
} from "helpers/.";
import { InputTypes } from "enums/.";
import * as REGEX from "consts/regex";

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
    formState: { errors },
  } = useForm<SignUpFormType>({ defaultValues: DEFAULT_VALUES });

  const [sendVerificationCode] = useSendVerificationCodeMutation();

  const dispatch = useAppDispatch();

  const FORM_FIELDS = [
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.FIRST_NAME,
      label: capitalizeFirstLetter(SignUpFormKeys.FIRST_NAME),
      placeholder: removeUnderscore(SignUpFormKeys.FIRST_NAME),
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
      placeholder: removeUnderscore(SignUpFormKeys.LAST_NAME),
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
      placeholder: removeUnderscore(SignUpFormKeys.PHONE_NUMBER),
      register: register(SignUpFormKeys.PHONE_NUMBER, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
        pattern: {
          value: REGEX.STRING_INCLUDES_UNDERSCORE_SIGN,
          message: "Enter correct phone number",
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.PHONE_NUMBER],
      error: errors[SignUpFormKeys.PHONE_NUMBER]?.message,
      numberFieldWithMaskProps: {
        format: "+ 48 ### ### ###",
        allowEmptyFormatting: true,
        mask: "_",
      },
    },
    {
      type: InputTypes.PASSWORD,
      key: SignUpFormKeys.PASSWORD,
      label: capitalizeFirstLetter(SignUpFormKeys.PASSWORD),
      placeholder: removeUnderscore(SignUpFormKeys.PASSWORD),
      register: register(SignUpFormKeys.PASSWORD, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PASSWORD),
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.PASSWORD],
      error: errors[SignUpFormKeys.PASSWORD]?.message,
      passwordFieldProps: {
        showHyperlink: false,
      },
    },
    {
      type: InputTypes.PASSWORD,
      key: SignUpFormKeys.CONFIRM_PASSWORD,
      label: capitalizeFirstLetter(SignUpFormKeys.CONFIRM_PASSWORD),
      placeholder: removeUnderscore(SignUpFormKeys.CONFIRM_PASSWORD),
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
      passwordFieldProps: {
        showHyperlink: false,
      },
    },
  ];

  const onSubmit = async (formData: SignUpFormType) => {
    const { phone, password } = formData;

    const formDataWithHashedPassword = {
      [SignUpFormKeys.PHONE_NUMBER]: phone,
      [SignUpFormKeys.PASSWORD]: encryptPassword(password),
    };

    dispatch(
      setSignUpFormValues({ ...formData, ...formDataWithHashedPassword })
    );
    sendVerificationCode({ ...formDataWithHashedPassword });
  };

  return {
    formFields: FORM_FIELDS,
    disableSubmitButton: false,
    onSubmit: handleSubmit(onSubmit),
  };
};
