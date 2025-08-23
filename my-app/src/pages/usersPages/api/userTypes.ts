export interface BusinessDataRegister {
  name: string;
  businessEmail: string;
  city: string;
  address: string;
}

export interface AdminDataRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export const errorMessagesEN = {
  invalidEmail: "Account with this email does not exists.",
  invalidPassword: "Wrong password. Please double-check and try again.",
  unverified: "Account not verified. Please verify your account",
  invalidCode: "Invalid code.",
  internalServerError: "Oops, something happpend! Please try again in 5 min.",
};
