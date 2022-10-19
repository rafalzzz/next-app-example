import { useCallback } from "react";
import { DeepPartial, useForm } from "react-hook-form";
import { FormField } from "types/.";

type useGenerateFormFieldsProps<FormType> = {
  formFields: FormField[];
  defaultValues: DeepPartial<FormType>;
};

export const useHandleFormData = <FormType extends object>({
  formFields,
  defaultValues,
}: useGenerateFormFieldsProps<FormType>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ defaultValues });

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
