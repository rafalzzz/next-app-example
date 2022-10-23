import { FieldProps } from "types/.";
import { InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export const TextField = <FormType extends object>({
  formField,
}: FieldProps<FormType>) => {
  const { key, label, register, error, isValueIncorrect } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.Input type={InputTypes.TEXT} {...register} />
      {isValueIncorrect && <Styled.Error>{error}</Styled.Error>}
    </Styled.Label>
  );
};
