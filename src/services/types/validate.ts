export enum Field {
  NOT_INPUT,
  NOT_PASS,
  PASS,
}
export interface Validate {
  email: Field;
  password: Field;
  confirmPassword?: Field;
}
