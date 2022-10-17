import { ExtendedFormField } from "types/extended-form-field";
import * as Styled from "./index.styled";

type TextFieldProps = {
  formField: ExtendedFormField;
};

export const NumberFieldWithMask = ({ formField }: TextFieldProps) => {
  const { key, label, register, error, format, allowEmptyFormatting, mask } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.NumberInputWithMask
        format={format ?? ""}
        allowEmptyFormatting={allowEmptyFormatting}
        mask={mask}
        {...register}
      />
      <Styled.Error>{error}</Styled.Error>
    </Styled.Label>
  );
};
