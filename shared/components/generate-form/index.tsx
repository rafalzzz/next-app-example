import { FormEventHandler, useCallback } from "react";
import {
  TextField,
  PasswordField,
  NumberFieldWithMask,
  Button,
} from "components/.";
import { FormField } from "types/.";
import { InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export type GenerateFormInputsProps<FormType extends object> = {
  formFields: FormField<FormType>[];
  buttonValue: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const GenerateForm = <FormType extends object>({
  formFields,
  buttonValue,
  handleSubmit,
}: GenerateFormInputsProps<FormType>) => {
  const getFormField = useCallback((formField: FormField<FormType>) => {
    const { type, key } = formField;

    switch (type) {
      case InputTypes.PASSWORD:
        return <PasswordField formField={formField} key={key} />;
      case InputTypes.NUMBER_WITH_MASK:
        return <NumberFieldWithMask formField={formField} key={key} />;
      default:
        return <TextField formField={formField} key={key} />;
    }
  }, []);

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {formFields.map((formField) => getFormField(formField))}
      <Button text={buttonValue} type="submit" />
    </Styled.Form>
  );
};
