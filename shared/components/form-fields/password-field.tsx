import { useState } from "react";

import { Hyperlink } from "components/hyperlink";
import { ExtendedFormField } from "types/extended-form-field";
import { InputTypes } from "enums/input-types";
import { Routes } from "enums/routes";
import * as Styled from "./index.styled";

type PasswordFieldProps = {
  formField: ExtendedFormField;
};

export const PasswordField = ({ formField }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { key, label, register, error, showHyperlink } = formField;

  return (
    <Styled.Label key={key}>
      <Styled.InputName>{`${label}:`}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.Input
          type={showPassword ? InputTypes.TEXT : InputTypes.PASSWORD}
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
      <Styled.Error marginBottom={10}>{error}</Styled.Error>
      {showHyperlink && (
        <Hyperlink
          url={Routes.FORGOT_PASSWORD}
          text={"Forgot password?"}
          fontSize={0.8}
        />
      )}
    </Styled.Label>
  );
};
