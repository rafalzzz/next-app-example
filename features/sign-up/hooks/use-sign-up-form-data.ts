import { useForm } from "react-hook-form";
import { useSendVerificationCodeMutation } from "sign-up/api";
import * as C from "sign-up/consts/messages";
import { SignUpFormKeys } from "sign-up/enums";
import { SignUpFormType } from "sign-up/types";
import { setSignUpFormValues } from "store/sign-up";
import { useAppDispatch } from "hooks/.";
import { encryptPassword, generateMessageFieldIsRequired } from "helpers/.";
import { InputTypes } from "enums/.";
import * as REGEX from "consts/regex";

const DEFAULT_VALUES = {
  [SignUpFormKeys.FIRST_NAME]: "",
  [SignUpFormKeys.LAST_NAME]: "",
  [SignUpFormKeys.EMAIL]: "",
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
      register: register(SignUpFormKeys.FIRST_NAME, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.FIRST_NAME),
        pattern: {
          value: REGEX.FIRST_NAME_VALIDATION,
          message: C.INVALID_FIRST_NAME_MESSAGE,
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.FIRST_NAME],
      error: errors[SignUpFormKeys.FIRST_NAME]?.message,
    },
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.LAST_NAME,
      register: register(SignUpFormKeys.LAST_NAME, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.LAST_NAME),
        pattern: {
          value: REGEX.LAST_NAME_VALIDATION,
          message: C.INVALID_LAST_NAME_MESSAGE,
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.LAST_NAME],
      error: errors[SignUpFormKeys.LAST_NAME]?.message,
    },
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.EMAIL,
      register: register(SignUpFormKeys.EMAIL, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.EMAIL),
        pattern: {
          value: REGEX.EMAIL_VALIDATION,
          message: C.INVALID_EMAIL_MESSAGE,
        },
      }),
      isValueIncorrect: !!errors[SignUpFormKeys.EMAIL],
      error: errors[SignUpFormKeys.EMAIL]?.message,
    },
    {
      type: InputTypes.NUMBER_WITH_MASK,
      key: SignUpFormKeys.PHONE_NUMBER,
      register: register(SignUpFormKeys.PHONE_NUMBER, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
        pattern: {
          value: REGEX.STRING_INCLUDES_UNDERSCORE_SIGN,
          message: C.INVALID_PHONE_MESSAGE,
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
      register: register(SignUpFormKeys.PASSWORD, {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PASSWORD),
        validate: (value) =>
          value.length < 6 ? C.SHORT_PASSWORD_MESSAGE : undefined,
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
      register: register(SignUpFormKeys.CONFIRM_PASSWORD, {
        required: generateMessageFieldIsRequired(
          SignUpFormKeys.CONFIRM_PASSWORD
        ),
        validate: {
          matchesPreviousPassword: (value) => {
            const passwordValue = getValues(SignUpFormKeys.PASSWORD);
            return passwordValue === value || C.PASSWORD_DOES_NOT_MATCH_MESSAGE;
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
    const { email, phone, password } = formData;

    const formDataWithHashedPassword = {
      [SignUpFormKeys.EMAIL]: email,
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
