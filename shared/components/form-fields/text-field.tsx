import { capitalizeFirstLetter } from "helpers/capitalize-first-letter";
import { FieldProps } from "types/.";
import { InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export const TextField = <FormType extends object>({ formField }: FieldProps<FormType>) => {
  const { key, label, placeholder, register, error, isValueIncorrect } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.Input
        type={InputTypes.TEXT}
        placeholder={capitalizeFirstLetter(placeholder)}
        {...register}
      />
      {isValueIncorrect && <Styled.Error>{error}</Styled.Error>}
    </Styled.Label>
  );
};
