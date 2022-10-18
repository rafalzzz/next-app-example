import { FormField } from "./form-field";

export type ExtendedFormField = FormField & {
  error?: string;
};
