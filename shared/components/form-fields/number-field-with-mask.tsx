import { transformInputKeyToLabel } from "helpers/trasform-input-key-to-label";
import { FieldProps, NumberFieldWithMaskProps } from "types/.";
import * as Styled from "./index.styled";

export const NumberFieldWithMask = <FormType extends object>({
  formField,
}: FieldProps<FormType>) => {
  const {
    key,
    label,
    register,
    error,
    isValueIncorrect,
    disabled,
    numberFieldWithMaskProps,
  } = formField;

  const { format, allowEmptyFormatting, mask } =
    numberFieldWithMaskProps as NumberFieldWithMaskProps;

  const { name, onChange, ref } = register;

  const inputLabel = label ?? transformInputKeyToLabel(key);

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${inputLabel}:`}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.NumberInputWithMask
          format={format ?? ""}
          allowEmptyFormatting={allowEmptyFormatting}
          mask={mask}
          onChange={onChange}
          name={name}
          disabled={disabled}
          getInputRef={ref}
          data-testid={`${key}-input`}
        />
      </Styled.InputContainer>
      {isValueIncorrect && (
        <Styled.Error data-testid={`${key}-error`}>{error}</Styled.Error>
      )}
    </Styled.Label>
  );
};
