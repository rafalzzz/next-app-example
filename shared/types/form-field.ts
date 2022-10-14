import { UseFormRegisterReturn } from "react-hook-form";
import { InputTypes } from "shared/enums/input-type";

export type FormField = {
  type: InputTypes;
  key: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
};
