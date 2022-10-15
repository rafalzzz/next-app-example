import { UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./form-field";

export type ExtendedFormField = Omit<FormField, "validationRules"> & {
  register: UseFormRegisterReturn;
  error?: string;
};
