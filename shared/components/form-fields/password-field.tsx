import { Path, UseFormRegister } from "react-hook-form";
import { useState } from "react";

import { Hyperlink } from "components/hyperlink";
import { InputTypes } from "shared/enums/input-type";
import { FormField } from "types/form-field";
import { Routes } from "enums/routes";
import * as Styled from "./index.styled";

type PasswordFieldProps<FormType extends object> = {
  formField: FormField;
  register: UseFormRegister<FormType>;
};

export const PasswordField = <FormType extends object>({
  formField,
  register,
}: PasswordFieldProps<FormType>) => {
  const [showPassword, setShowPassword] = useState(false);

  const { key, label } = formField;

  return (
    <Styled.Label key={label}>
      <Styled.InputName>{label}</Styled.InputName>
      <Styled.InputContainer>
        <Styled.Input
          type={showPassword ? InputTypes.TEXT : InputTypes.PASSWORD}
          width={250}
          {...register(key as Path<FormType>)}
        />
        <Styled.Button type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
          {showPassword ? "Hide" : "Show"}
        </Styled.Button>
      </Styled.InputContainer>
      <Hyperlink url={Routes.FORGOT_PASSWORD} text={"Forgot password?"} fontSize={0.8} />
    </Styled.Label>
  );
};
