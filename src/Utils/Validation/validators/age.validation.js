export const ageValidate = (value, helpers) => {
  const nowDate = new Date().getFullYear();
  const userDate = new Date(value).getFullYear();
  const age = nowDate - userDate;
  return age === 18
    ? helpers.message("age must be greater than 18 years")
    : true;
};
