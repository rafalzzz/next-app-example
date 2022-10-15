import { FormEventHandler, useCallback } from "react";

import { TextField, PasswordField } from "components/form-fields";
import { InputTypes } from "shared/enums/input-type";
import * as Styled from "./index.styled";
import { UseFormRegisterReturn } from "react-hook-form";

export type ExtendedFormField = {
  type: InputTypes;
  key: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
};

type GenerateFormInputsProps = {
  formFields: ExtendedFormField[];
  buttonValue: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const GenerateForm = ({
  formFields,
  buttonValue,
  handleSubmit,
}: GenerateFormInputsProps) => {
  const getFormField = useCallback((formField: ExtendedFormField) => {
    const { type, key } = formField;

    switch (type) {
      case InputTypes.TEXT:
        return <TextField key={key} {...{ formField }} />;
      case InputTypes.PASSWORD:
        return <PasswordField key={key} {...{ formField }} />;
      default:
        break;
    }
  }, []);

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {formFields.map((formField) => getFormField(formField))}
      <Styled.Button type="submit" value="Submit">
        {buttonValue}
      </Styled.Button>
    </Styled.Form>
  );
};
