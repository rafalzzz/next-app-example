import { ControllerRenderProps, Path } from "react-hook-form";
import { ExtendedFormField } from "./extended-form-field";

export type FieldProps<FormType extends object> = {
  formField: ExtendedFormField;
  fieldProps: ControllerRenderProps<FormType, Path<FormType>>;
};
