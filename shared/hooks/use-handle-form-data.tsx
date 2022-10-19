import { Comparison } from "enums/comparison";
import { useCallback } from "react";
import { DeepPartial, Path, PathValue, useForm } from "react-hook-form";
import { FormField } from "types/.";

type useGenerateFormFieldsProps<FormType extends object> = {
  formFields: FormField[];
  defaultValues: DeepPartial<FormType>;
};

export const useHandleFormData = <FormType extends object>({
  formFields,
  defaultValues,
}: useGenerateFormFieldsProps<FormType>) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ defaultValues });

  const validationRule = useCallback(
    (comparison?: Comparison, linkedField?: readonly Path<FormType>[]) => {
      if (!linkedField) {
        return;
      }

      switch (comparison) {
        case Comparison.EQUAL:
          return (value: readonly PathValue<FormType, Path<FormType>>[]) =>
            value === watch(linkedField);

        default:
          break;
      }
    },
    [watch]
  );

  const transformFormFields = useCallback(
    (formFieldsData: FormField[]) =>
      formFieldsData.map((formField) => ({
        ...formField,
        error: errors[formField.key as keyof FormType]?.message,
        linkedFields: undefined,
        validationRules: {
          ...formField.validationRules,
          validate: validationRule(
            formField?.linkedFields?.comparison,
            formField?.linkedFields?.field
          ),
        },
      })),
    [errors, validationRule]
  );

  return {
    extendedFormFields: transformFormFields(formFields),
    control,
    watch,
    handleSubmit,
  };
};
