import { FormEventHandler, useCallback } from "react";
import { UseFormRegister } from "react-hook-form";

import { TextField, PasswordField } from "components/form-fields";
import { InputTypes } from "shared/enums/input-type";
import { FormField } from "types/form-field";
import * as Styled from "./index.styled";

type GenerateFormInputsProps<FormType extends object> = {
  formFields: FormField[];
  buttonValue: string;
  register: UseFormRegister<FormType>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const GenerateForm = <FormType extends object>({
  formFields,
  buttonValue,
  register,
  handleSubmit,
}: GenerateFormInputsProps<FormType>) => {
  const getFormField = useCallback(
    (formField: FormField) => {
      const { type, key } = formField;

      switch (type) {
        case InputTypes.TEXT:
          return <TextField key={key} {...{ register, formField }} />;
        case InputTypes.PASSWORD:
          return <PasswordField key={key} {...{ register, formField }} />;
        default:
          break;
      }
    },
    [register]
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {formFields.map((formField) => getFormField(formField))}
      <Styled.Button type="submit" value="Submit">
        {buttonValue}
      </Styled.Button>
    </Styled.Form>
  );
};
