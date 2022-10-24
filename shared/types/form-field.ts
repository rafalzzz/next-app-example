import { Path, UseFormRegisterReturn } from "react-hook-form";
import { InputTypes } from "enums/.";

export type FormField<FormType> = {
  type: InputTypes;
  key: Path<FormType>;
  label: string;
  isValueIncorrect: boolean;
  register: UseFormRegisterReturn;
  error?: string;
  showHyperlink?: boolean;
  format?: string;
  allowEmptyFormatting?: boolean;
  mask?: string | string[];
  buttonText?: string;
  disabled?: boolean;
  onClick?: () => void;
};
