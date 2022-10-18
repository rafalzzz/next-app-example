import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "types/form-field";

type useGenerateFormFieldsProps = {
  formFields: FormField[];
};

export const useHandleFormData = <FormType extends object>({
  formFields,
}: useGenerateFormFieldsProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const transformFormFields = useCallback(
    (formFieldsData: FormField[]) =>
      formFieldsData.map((formField) => ({
        ...formField,
        error: errors[formField.key as keyof FormType]?.message,
      })),
    [errors]
  );

  return {
    extendedFormFields: transformFormFields(formFields),
    control,
    handleSubmit,
  };
};
