import { FieldProps } from "types/.";
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
    format,
    allowEmptyFormatting,
    mask,
    buttonText,
    disabled,
    onClick,
  } = formField;

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
          getInputRef={ref}
        />
        <Styled.Button type="button" disabled={disabled} onClick={onClick}>
          {buttonText}
        </Styled.Button>
      </Styled.InputContainer>
      {isValueIncorrect && <Styled.Error>{error}</Styled.Error>}
    </Styled.Label>
  );
};
