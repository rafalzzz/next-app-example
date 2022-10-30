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

  const {
    format,
    allowEmptyFormatting,
    mask,
    buttonText,
    buttonIsDisabled,
    onClick,
  } = numberFieldWithMaskProps as NumberFieldWithMaskProps;

  const { name, onChange, ref } = register;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.NumberInputWithMask
          format={format ?? ""}
          allowEmptyFormatting={allowEmptyFormatting}
          mask={mask}
          width={250}
          onChange={onChange}
          name={name}
          disabled={disabled}
          getInputRef={ref}
        />
        <Styled.Button
          type="button"
          disabled={buttonIsDisabled}
          onClick={onClick}
        >
          {buttonText}
        </Styled.Button>
      </Styled.InputContainer>
      {isValueIncorrect && <Styled.Error>{error}</Styled.Error>}
    </Styled.Label>
  );
};
