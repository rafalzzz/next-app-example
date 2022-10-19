import { useState } from "react";
import { Hyperlink } from "components/.";
import { FieldProps } from "types/.";
import { Routes, InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export const PasswordField = <FormType extends object>({
  formField,
  fieldProps,
}: FieldProps<FormType>) => {
  const [showPassword, setShowPassword] = useState(false);

  const { key, label, error, showHyperlink } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.Input
          type={showPassword ? InputTypes.TEXT : InputTypes.PASSWORD}
          width={250}
          {...fieldProps}
        />
        <Styled.Button type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
          {showPassword ? "Hide" : "Show"}
        </Styled.Button>
      </Styled.InputContainer>
      <Styled.Error marginBottom={10}>{error}</Styled.Error>
      {showHyperlink && (
        <Hyperlink url={Routes.FORGOT_PASSWORD} text={"Forgot password?"} fontSize={0.8} />
      )}
    </Styled.Label>
  );
};
