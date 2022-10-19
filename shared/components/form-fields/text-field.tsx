import { FieldProps } from "types/.";
import { InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export const TextField = <FormType extends object>({
  formField,
  fieldProps,
}: FieldProps<FormType>) => {
  const { key, label, error, isValueIncorrect } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.Input type={InputTypes.TEXT} {...fieldProps} />
      {isValueIncorrect && <Styled.Error>{error}</Styled.Error>}
    </Styled.Label>
  );
};
