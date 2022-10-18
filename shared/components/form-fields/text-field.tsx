import { InputTypes } from "enums/input-types";
import { FieldProps } from "types/field-props";
import * as Styled from "./index.styled";

export const TextField = <FormType extends object>({
  formField,
  fieldProps,
}: FieldProps<FormType>) => {
  const { key, label, error } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.Input type={InputTypes.TEXT} {...fieldProps} />
      <Styled.Error>{error}</Styled.Error>
    </Styled.Label>
  );
};
