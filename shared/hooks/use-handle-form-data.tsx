import { useCallback } from "react";
import { Path, useForm } from "react-hook-form";
import { FormField } from "types/form-field";

type useGenerateFormFieldsProps = {
  formFields: FormField[];
};

export const useHandleFormData = <FormType extends object>({
  formFields,
}: useGenerateFormFieldsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const transformFormFields = useCallback(
    (formFieldsData: FormField[]) =>
      formFieldsData.map((formField) => ({
        ...formField,
        register: register(formField.key as Path<FormType>, {
          ...formField.validationRules,
        }),
        error: errors[formField.key as keyof FormType]?.message,
      })),
    [errors, register]
  );

  return {
    extendedFormFields: transformFormFields(formFields),
    handleSubmit,
  };
};
