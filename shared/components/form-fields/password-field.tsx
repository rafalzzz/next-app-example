import { useState } from "react";
import { Hyperlink } from "components/.";
import { transformInputKeyToLabel } from "helpers/index";
import { FieldProps, PasswordFieldProps } from "types/.";
import { InputTypes, Paths } from "enums/.";
import * as Styled from "./index.styled";

export const PasswordField = <FormType extends object>({
  formField,
}: FieldProps<FormType>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    key,
    label,
    placeholder,
    register,
    error,
    isValueIncorrect,
    passwordFieldProps,
  } = formField;

  const { showHyperlink } = passwordFieldProps as PasswordFieldProps;

  const inputLabel = label ?? transformInputKeyToLabel(key);

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${inputLabel}:`}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.Input
          type={showPassword ? InputTypes.TEXT : InputTypes.PASSWORD}
          placeholder={placeholder ?? inputLabel}
          width={250}
          {...register}
        />
        <Styled.Button
          type="button"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? "Hide" : "Show"}
        </Styled.Button>
      </Styled.InputContainer>
      {isValueIncorrect && (
        <Styled.Error marginBottom={10}>{error}</Styled.Error>
      )}
      {showHyperlink && (
        <Hyperlink
          url={Paths.FORGOT_PASSWORD}
          text={"Forgot password?"}
          fontSize={0.8}
        />
      )}
    </Styled.Label>
  );
};
