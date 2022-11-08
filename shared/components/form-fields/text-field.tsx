import { transformInputKeyToLabel } from "helpers/trasform-input-key-to-label";
import { FieldProps } from "types/.";
import { InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export const TextField = <FormType extends object>({
  formField,
}: FieldProps<FormType>) => {
  const { key, label, placeholder, register, error, isValueIncorrect } =
    formField;

  const inputLabel = label ?? transformInputKeyToLabel(key);

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${inputLabel}:`}</Styled.InputName>
      <Styled.Input
        type={InputTypes.TEXT}
        placeholder={placeholder ?? inputLabel}
        data-testid={`${key}-input`}
        {...register}
      />
      {isValueIncorrect && (
        <Styled.Error data-testid={`${key}-error`}>{error}</Styled.Error>
      )}
    </Styled.Label>
  );
};
