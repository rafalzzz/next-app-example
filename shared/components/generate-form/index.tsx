import { FormEventHandler, useCallback } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
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
    (
      formField: FormField<FormType>,
      fieldProps: ControllerRenderProps<FormType, Path<FormType>>
    ) => {
      const { type } = formField;

      switch (type) {
        case InputTypes.PASSWORD:
          return (
            <PasswordField formField={formField} fieldProps={fieldProps} />
          );
        case InputTypes.NUMBER_WITH_MASK:
          return (
            <NumberFieldWithMask
              formField={formField}
              fieldProps={fieldProps}
            />
          );
        default:
          return <TextField formField={formField} fieldProps={fieldProps} />;
      }
    },
    []
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      {formFields.map((formField) => (
        <Controller
          key={formField.key}
          name={formField.key}
          control={control}
          rules={formField.validationRules}
          render={({ field }) => getFormField(formField, field)}
        />
      ))}
      <Button text={buttonValue} type="submit" />
    </Styled.Form>
  );
};
