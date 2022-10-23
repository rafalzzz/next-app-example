import { FormField } from "./form-field";

export type FieldProps<FormType extends object> = {
  formField: FormField<FormType>;
};
