// Set in localstorage
export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key: string) => {
  const localStorageItem = localStorage.getItem(key);
  const item = localStorageItem ? JSON.parse(localStorageItem) : null;
  return item;
};
