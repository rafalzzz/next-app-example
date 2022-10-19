import { useForm } from "react-hook-form";
import { useAppDispatch } from "hooks/.";
import {
  capitalizeFirstLetter,
  generateMessageFieldIsRequired,
} from "helpers/.";
import { handleModal } from "store/sign-up";
import * as C from "consts/validation";
import { SignUpFormType } from "sign-up/types/sign-up-form";
import { Comparison, InputTypes } from "enums/.";
import { SignUpFormKeys } from "sign-up/enums/sign-up-form-keys";

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
      error: errors[SignUpFormKeys.FIRST_NAME]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.FIRST_NAME),
        pattern: {
          value: C.FIRST_NAME_VALIDATION,
          message: "Invalid first name",
        },
      },
    },
    {
      type: InputTypes.TEXT,
      key: SignUpFormKeys.LAST_NAME,
      label: capitalizeFirstLetter(SignUpFormKeys.LAST_NAME),
      error: errors[SignUpFormKeys.LAST_NAME]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.LAST_NAME),
        pattern: {
          value: C.LAST_NAME_VALIDATION,
          message: "Invalid last name",
        },
      },
    },
    {
      type: InputTypes.NUMBER_WITH_MASK,
      key: SignUpFormKeys.PHONE_NUMBER,
      label: capitalizeFirstLetter(SignUpFormKeys.PHONE_NUMBER),
      error: errors[SignUpFormKeys.PHONE_NUMBER]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PHONE_NUMBER),
        pattern: {
          value: C.STRING_INCLUDES_UNDERSCORE_SIGN,
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
      error: errors[SignUpFormKeys.PASSWORD]?.message,
      validationRules: {
        required: generateMessageFieldIsRequired(SignUpFormKeys.PASSWORD),
      },
    },
    {
      type: InputTypes.PASSWORD,
      key: SignUpFormKeys.CONFIRM_PASSWORD,
      label: capitalizeFirstLetter(SignUpFormKeys.CONFIRM_PASSWORD),
      error: errors[SignUpFormKeys.CONFIRM_PASSWORD]?.message,
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
