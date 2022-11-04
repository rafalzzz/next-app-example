import { Path, UseFormRegisterReturn } from "react-hook-form";
import { InputTypes } from "enums/.";

export type PasswordFieldProps = {
  showHyperlink: boolean;
};

export type NumberFieldWithMaskProps = {
  format: string;
  allowEmptyFormatting: boolean;
  mask: string | string[];
};

export type FormField<FormType> = {
  type: InputTypes;
  key: Path<FormType>;
  register: UseFormRegisterReturn;
  isValueIncorrect: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  passwordFieldProps?: PasswordFieldProps;
  numberFieldWithMaskProps?: NumberFieldWithMaskProps;
};
