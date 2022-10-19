import { ControllerRenderProps, Path } from "react-hook-form";
import { FormField } from "./extended-form-field";

export type FieldProps<FormType extends object> = {
  formField: FormField;
  fieldProps: ControllerRenderProps<FormType, Path<FormType>>;
};
