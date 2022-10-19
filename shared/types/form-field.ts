import { Path, RegisterOptions } from "react-hook-form";
import { InputTypes } from "enums/input-types";

export type FormField<FormType> = {
  type: InputTypes;
  key: Path<FormType>;
  label: string;
  isValueIncorrect: boolean;
  error: string;
  validationRules: RegisterOptions;
  showHyperlink?: boolean;
  format?: string;
  allowEmptyFormatting?: boolean;
  mask?: string | string[];
  errorMessage?: string;
  onClick?: () => void;
};
