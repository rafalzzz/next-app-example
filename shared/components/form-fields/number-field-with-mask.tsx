import { PatternFormat } from "react-number-format";
import { ExtendedFormField } from "types/extended-form-field";

import * as Styled from "./index.styled";

type TextFieldProps = {
  formField: ExtendedFormField;
};

//Articles how to solve problem with NumerFieldWithMask console error
//https://codesandbox.io/s/late-feather-shr01?file=/src/App.js:391-401
//https://react-hook-form.com/get-started#IntegratingControlledInputs
export const NumberFieldWithMask = ({ formField }: TextFieldProps) => {
  const {
    key,
    label,
    register,
    error,
    format,
    allowEmptyFormatting,
    mask,
    onClick,
  } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.InputContainer>
        <PatternFormat
          customInput={Styled.NumberInputWithMask}
          format={format ?? ""}
          allowEmptyFormatting={allowEmptyFormatting}
          mask={mask}
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
