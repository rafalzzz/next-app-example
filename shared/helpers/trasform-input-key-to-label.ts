import { capitalizeFirstLetter, removeUnderscore } from ".";

export const transformInputKeyToLabel = (key: string) =>
  capitalizeFirstLetter(removeUnderscore(key));
