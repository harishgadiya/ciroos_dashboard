export const saveFilter = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFilter = (key: string) => {
  return localStorage.getItem(key);
};
