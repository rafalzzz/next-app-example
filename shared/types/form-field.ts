import { Path, RegisterOptions } from "react-hook-form";
import { InputTypes } from "enums/.";

export type FormField<FormType> = {
  type: InputTypes;
  key: Path<FormType>;
  label: string;
  isValueIncorrect: boolean;
  validationRules: RegisterOptions;
  error?: string;
  showHyperlink?: boolean;
  format?: string;
  allowEmptyFormatting?: boolean;
  mask?: string | string[];
  buttonText?: string;
  onClick?: () => void;
};
