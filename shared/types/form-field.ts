import { Path, UseFormRegisterReturn } from "react-hook-form";
import { InputTypes } from "enums/.";

export type PasswordFieldProps = {
  showHyperlink: boolean;
};

export type NumberFieldWithMaskProps = {
  format: string;
  allowEmptyFormatting: boolean;
  mask: string | string[];
  buttonText: string;
  buttonIsDisabled: boolean;
  onClick: () => void;
};

export type FormField<FormType> = {
  type: InputTypes;
  key: Path<FormType>;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  isValueIncorrect: boolean;
  error?: string;
  disabled?: boolean;
  passwordFieldProps?: PasswordFieldProps;
  numberFieldWithMaskProps?: NumberFieldWithMaskProps;
};
