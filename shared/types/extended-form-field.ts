import { UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./form-field";

export type ExtendedFormField = Exclude<FormField, "validationRules"> & {
  register: UseFormRegisterReturn;
  error: string;
};
