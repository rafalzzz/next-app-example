import { InputTypes } from "enums/input-types";
import { RegisterOptions } from "react-hook-form";

export type FormField = {
  type: InputTypes;
  key: string;
  label: string;
  validationRules: RegisterOptions;
  showHyperlink?: boolean;
  format?: string;
  allowEmptyFormatting?: boolean;
  mask?: string | string[];
  onClick?: () => void;
};
