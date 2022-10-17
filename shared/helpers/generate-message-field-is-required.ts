import { capitalizeFirstLetter } from "./capitalize-first-letter";

export const generateMessageFieldIsRequired = (fieldKey: string) => {
  const key = capitalizeFirstLetter(fieldKey).replace(/_/g, " ");

  return `${key} is required.`;
};
