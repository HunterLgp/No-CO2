const regexUserName = /[a-zA-Z0-9]{8,20}/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const regexName = /[A-Z]/;

export enum Field {
  NOT_INPUT,
  NOT_PASS,
  PASS,
}

export interface Validate {
  userName: Field;
  password: Field;
  confirmPassword?: Field;
  email?: Field;
  firstName?: Field;
  lastName?: Field;
}

export const validateUserName = (userName: string) => {
  return !userName.trim() ? Field.NOT_INPUT : regexUserName.test(userName) ? Field.PASS : Field.NOT_PASS;
};

export const validateEmail = (email: string) => {
  return !email.trim() ? Field.NOT_INPUT : regexEmail.test(email) ? Field.PASS : Field.NOT_PASS;
};
export const validatePassword = (password: string) => {
  return !password.trim() ? Field.NOT_INPUT : regexPassword.test(password) ? Field.PASS : Field.NOT_PASS;
};
export const validateConfirmPassword = (confirmPassword: string, password: string) => {
  return !confirmPassword ? Field.NOT_INPUT : confirmPassword === password ? Field.PASS : Field.NOT_PASS;
};

export const validateName = (name: string) => {
  if (!name.trim()) {
    return Field.NOT_INPUT;
  } else {
    const nameArr = name.split(" ");
    return nameArr.reduce((total, value) => {
      if (total) {
        return regexName.test(value.charAt(0));
      }
      return total;
    }, true)
      ? Field.PASS
      : Field.NOT_PASS;
  }
};

export const validateRegister = (
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
) => {
  return {
    userName: validateUserName(userName),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
    firstName: validateName(firstName),
    lastName: validateName(lastName),
  };
};
export const validateLogin = (userName: string, password: string) => {
  return {
    userName: validateUserName(userName),
    password: validatePassword(password),
  };
};

