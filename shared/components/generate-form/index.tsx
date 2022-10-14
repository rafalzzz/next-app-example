import { FormEventHandler, useCallback } from "react";

import { TextField, PasswordField } from "components/form-fields";
import { InputTypes } from "shared/enums/input-type";
import { FormField } from "types/form-field";
import * as Styled from "./index.styled";

type GenerateFormInputsProps = {
  formFields: FormField[];
  buttonValue: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const GenerateForm = ({
  formFields,
  buttonValue,
  handleSubmit,
}: GenerateFormInputsProps) => {
  const getFormField = useCallback((formField: FormField) => {
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
