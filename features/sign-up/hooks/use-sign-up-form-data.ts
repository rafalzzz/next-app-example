import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from "common/supabase";
import { useSendVerificationCodeMutation } from "sign-up/api";
import { SignUpFormKeys } from "sign-up/enums";
import { SignUpRequest } from "sign-up/types";
import {
  selectSendVerificationCodeRequestState,
  selectVerifyPhoneNumberRequestState,
  setPhoneNumber,
  setSendVerificationCodeRequestState,
  setSignUpRequestState,
} from "store/sign-up";
import { useAppDispatch, useAppSelector } from "hooks/.";
import {
  capitalizeFirstLetter,
  displayErrorMessage,
  generateId,
  generateMessageFieldIsRequired,
  removeUnderscore,
} from "helpers/.";
import { InputTypes, Paths, RequestState } from "enums/.";
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
    watch,
    formState: { errors },
  } = useForm<SignUpRequest>({ defaultValues: DEFAULT_VALUES });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [sendVerificationCode] = useSendVerificationCodeMutation();

  const sendVerificationCodeRequestState = useAppSelector(
    selectSendVerificationCodeRequestState
  );
  const verifyPhoneNumberRequestState = useAppSelector(
    selectVerifyPhoneNumberRequestState
  );

  const sendVerificationCodeRequestIsLoading =
    sendVerificationCodeRequestState === RequestState.LOADING;
  const phoneNumberIsVerified =
    verifyPhoneNumberRequestState === RequestState.SUCCESS;

  const buttonValueWhenRequestIsLoading = sendVerificationCodeRequestIsLoading
    ? "Sending"
    : "Verify";

  const buttonText = phoneNumberIsVerified
    ? "Verified"
    : buttonValueWhenRequestIsLoading;

  const phoneNumber = watch(SignUpFormKeys.PHONE_NUMBER);
  const phoneNumberIsFilled = phoneNumber.includes("_");

  const onClick = useCallback(() => {
    dispatch(setPhoneNumber(phoneNumber));
    dispatch(setSendVerificationCodeRequestState(RequestState.LOADING));
    sendVerificationCode({ [SignUpFormKeys.PHONE_NUMBER]: phoneNumber });
  }, [phoneNumber, sendVerificationCode, dispatch]);

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
      disabled: phoneNumberIsVerified,
      numberFieldWithMaskProps: {
        format: "+ 48 ### ### ###",
        allowEmptyFormatting: true,
        mask: "_",
        buttonIsDisabled: !phoneNumber || phoneNumberIsFilled,
        buttonText,
        onClick,
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

  const onSubmit = async (formData: SignUpRequest) => {
    dispatch(setSignUpRequestState(RequestState.LOADING));

    const { first_name, last_name, phone_number, password } = formData;

    const { error } = await supabase.from("users").insert({
      id: generateId(),
      first_name,
      last_name,
      phone_number,
      password,
    });

    if (error) {
      displayErrorMessage(error);
      dispatch(setSignUpRequestState(RequestState.ERROR));
      return;
    }

    dispatch(setSignUpRequestState(RequestState.SUCCESS));
    toast.success(error);
    router.push(Paths.SIGN_IN);
  };

  return {
    formFields: FORM_FIELDS,
    disableSubmitButton: !phoneNumberIsVerified,
    onSubmit: handleSubmit(onSubmit),
  };
};
