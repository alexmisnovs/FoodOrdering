const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,15}$/;

export const validateEmail = (email: string) => {
  return validEmailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return validPasswordRegex.test(password);
};
