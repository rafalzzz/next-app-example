import { ReducerKeys } from "enums/index";
import { removeLocalStorage } from "./local-storage-utils";

const PERSIST_PREFIX = "persist:";

export const removePersistedState = (items: ReducerKeys[]) => {
  items.forEach((item) => removeLocalStorage(`${PERSIST_PREFIX}${item}`));
};
