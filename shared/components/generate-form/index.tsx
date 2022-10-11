import { FormEventHandler, useCallback } from "react";
import { Path, UseFormRegister } from "react-hook-form";

import { InputTypes } from "shared/enums/input-type";
import { FormField } from "types/form-field";
import * as Styled from "./index.styled";

type GenerateFormInputsProps<FormType extends object> = {
  formFields: FormField[];
  register: UseFormRegister<FormType>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const GenerateForm = <FormType extends object>({
  formFields,
  register,
  handleSubmit,
}: GenerateFormInputsProps<FormType>) => {
  const getFormField = useCallback(
    (formField: FormField) => {
      const { type, key, label } = formField;

      switch (type) {
        case InputTypes.TEXT:
          return (
            <Styled.Label key={label}>
              <Styled.InputName>{label}</Styled.InputName>
              <Styled.Input type={InputTypes.TEXT} {...register(key as Path<FormType>)} />
            </Styled.Label>
          );
        case InputTypes.PASSWORD:
          return (
            <Styled.Label key={label}>
              <Styled.InputName>{label}</Styled.InputName>
              <Styled.Input type={InputTypes.PASSWORD} {...register(key as Path<FormType>)} />
            </Styled.Label>
          );
        default:
          break;
      }
    },
    [register]
  );

  return (
    <Styled.Form onSubmit={handleSubmit} autoComplete="off">
      {formFields.map((formField) => getFormField(formField))}
      <Styled.Input type="submit" value="Submit" />
    </Styled.Form>
  );
};
