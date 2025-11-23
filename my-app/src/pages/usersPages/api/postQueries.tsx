import { Query } from "../../../API/callApi";
import { User } from "./userTypes";

export const postLogin = (input: any): Query => ({
  endpoint: `auth/login`,
  method: "POST",
  variables: input,
});

export const postRegister = (info: {
  tenantDto: any;
  userDto: any;
}): Query => ({
  endpoint: `auth/register`,
  method: "POST",
  variables: {
    tenantDto: info.tenantDto,
    userDto: info.userDto,
  },
});

export const validateEmail = (input: { email: string }): Query => ({
  endpoint: `auth/validate_email`,
  method: "POST",
  variables: input,
});

export const codeVerification = (input: {
  verificationCode: string;
  email: string;
}): Query => ({
  endpoint: `auth/verify`,
  method: "POST",
  variables: input,
});

export const codeVerificationResend = (input: { email: string }): Query => ({
  endpoint: `auth/verification-code/${input.email}`,
  method: "POST",
});

export const updateProfile = (input: Partial<User>): Query => ({
  endpoint: `users`,
  method: "PATCH",
  variables: input,
});

export const savePreferences = (input: any): Query => ({
  endpoint: `settings`,
  method: "PUT",
  variables: input,
});

export const stripePaymentIntent = (input: {
  tenantId: string;
  plan: string;
  amount: number;
  currency: string;
  abonnementDuration: string;
}): Query => ({
  endpoint: `stripe/create-checkout-session`,
  method: "POST",
  variables: input,
});

export const selfAdding = (input: any, id: string): Query => ({
  endpoint: `access-requests/${id}`,
  method: "POST",
  variables: input,
});
