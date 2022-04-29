import { Field } from "../types/validate";

export const validateEmail = (email: string) => {
  return !email.trim()
    ? Field.NOT_INPUT
    : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ? Field.PASS
    : Field.NOT_PASS;
};
export const validatePassword = (password: string) => {
  return !password.trim()
    ? Field.NOT_INPUT
    : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)
    ? Field.PASS
    : Field.NOT_PASS;
};
export const validateConfirmPassword = (confirmPassword: string, password: string) => {
  return !confirmPassword ? Field.NOT_INPUT : confirmPassword === password ? Field.PASS : Field.NOT_PASS;
};
export const validateAll = (email: string, password: string, confirmPassword?: string) => {
  return confirmPassword === undefined
    ? {
        email: validateEmail(email),
        password: validatePassword(password),
      }
    : {
        email: validateEmail(email),
        password: validatePassword(password),
        confirmPassword: validateConfirmPassword(confirmPassword, password),
      };
};
