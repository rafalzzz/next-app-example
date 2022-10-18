import { ExtendedFormField } from "types/extended-form-field";
import * as Styled from "./index.styled";

type TextFieldProps = {
  formField: ExtendedFormField;
};

export const NumberFieldWithMask = ({ formField }: TextFieldProps) => {
  const { key, label, register, error, format, allowEmptyFormatting, mask, onClick } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.NumberInputWithMask
          format={format ?? ""}
          allowEmptyFormatting={allowEmptyFormatting}
          mask={mask}
          width={250}
          {...register}
        />
        <Styled.Button type="button" onClick={onClick}>
          Verify
        </Styled.Button>
      </Styled.InputContainer>
      <Styled.Error>{error}</Styled.Error>
    </Styled.Label>
  );
};
