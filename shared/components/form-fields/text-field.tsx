import { Path, UseFormRegister } from "react-hook-form";

import { InputTypes } from "shared/enums/input-type";
import { FormField } from "types/form-field";
import * as Styled from "./index.styled";

type TextFieldProps<FormType extends object> = {
  formField: FormField;
  register: UseFormRegister<FormType>;
};

export const TextField = <FormType extends object>({
  formField,
  register,
}: TextFieldProps<FormType>) => {
  const { key, label } = formField;

  return (
    <Styled.Label key={label}>
      <Styled.InputName>{label}</Styled.InputName>
      <Styled.Input type={InputTypes.TEXT} {...register(key as Path<FormType>)} />
    </Styled.Label>
  );
};
