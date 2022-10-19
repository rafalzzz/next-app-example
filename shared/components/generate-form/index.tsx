import { FormEventHandler, ReactElement, useCallback } from "react";
import { Control, Controller, ControllerRenderProps, Path } from "react-hook-form";
import { TextField, PasswordField, NumberFieldWithMask } from "components/form-fields";
import { ExtendedFormField } from "types/.";
import { InputTypes } from "enums/.";
import * as Styled from "./index.styled";

export type GenerateFormInputsProps<FormType extends object> = {
  formFields: ExtendedFormField[];
  buttonValue: string;
  control: Control<FormType, keyof FormType>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const GenerateForm = <FormType extends object>({
  formFields,
  buttonValue,
  control,
  handleSubmit,
}: GenerateFormInputsProps<FormType>) => {
  const getFormField = useCallback(
    (formField: ExtendedFormField, fieldProps: ControllerRenderProps<FormType, Path<FormType>>) => {
      const { type } = formField;

      switch (type) {
        case InputTypes.TEXT:
          return <TextField formField={formField} fieldProps={fieldProps} />;
        case InputTypes.PASSWORD:
          return <PasswordField formField={formField} fieldProps={fieldProps} />;
        case InputTypes.NUMBER_WITH_MASK:
          return <NumberFieldWithMask formField={formField} fieldProps={fieldProps} />;
        default:
          break;
      }
    },
    []
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {formFields.map((formField) => (
        <Controller
          key={formField.key}
          name={formField.key as Path<FormType>}
          control={control}
          rules={formField.validationRules}
          render={({ field }) => getFormField(formField, field) as ReactElement}
        />
      ))}
      <Styled.Button type="submit" value="Submit">
        {buttonValue}
      </Styled.Button>
    </Styled.Form>
  );
};
