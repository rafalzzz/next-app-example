import { ControllerRenderProps, Path } from "react-hook-form";
import { FormField } from "./form-field";

export type FieldProps<FormType extends object> = {
  formField: FormField<FormType>;
  fieldProps: ControllerRenderProps<FormType, Path<FormType>>;
};
