import { useCallback } from "react";
import { Path, RegisterOptions, useForm } from "react-hook-form";
import { InputTypes } from "enums/input-type";

type FormFields = {
  type: InputTypes;
  key: string;
  label: string;
  validationRules: RegisterOptions;
};

type useGenerateFormFieldsProps = {
  formFields: FormFields[];
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
    (formFieldsData: FormFields[]) =>
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
