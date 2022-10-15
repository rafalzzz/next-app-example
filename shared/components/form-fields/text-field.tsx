import { InputTypes } from "enums/input-types";
import { ExtendedFormField } from "types/extended-form-field";
import * as Styled from "./index.styled";

type TextFieldProps = {
  formField: ExtendedFormField;
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
