export const getFormData = (form) => {
  const values = {};
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    values[key] = value;
  });

  return values;
};
