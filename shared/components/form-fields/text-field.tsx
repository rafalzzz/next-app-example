import { InputTypes } from "shared/enums/input-type";
import { FormField } from "types/form-field";
import * as Styled from "./index.styled";

type TextFieldProps = {
  formField: FormField;
};

export const TextField = ({ formField }: TextFieldProps) => {
  const { key, label, register, error } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.Input type={InputTypes.TEXT} {...register} />
      <Styled.Error>{error}</Styled.Error>
    </Styled.Label>
  );
};
