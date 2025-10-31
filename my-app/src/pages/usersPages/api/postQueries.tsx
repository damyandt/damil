import { Query } from "../../../API/callApi";

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

export const validateEmail = (input: any): Query => ({
  endpoint: `auth/validate_email`,
  method: "POST",
  variables: input,
});

export const codeVerification = (input: any): Query => ({
  endpoint: `auth/verify`,
  method: "POST",
  variables: input,
});

export const codeVerificationResend = (input: any): Query => ({
  endpoint: `auth/resend`,
  method: "POST",
  variables: input,
});

export const updateProfile = (input: any): Query => ({
  endpoint: `users`,
  method: "PATCH",
  variables: input,
});

export const savePreferences = (input: any): Query => ({
  endpoint: `settings`,
  method: "PUT",
  variables: input,
});

export const stripePaymentIntent = (input: any): Query => ({
  endpoint: `stripe/create-checkout-session`,
  method: "POST",
  variables: input,
});

export const selfAdding = (input: any, id: number): Query => ({
  endpoint: `access-requests/${id}`,
  method: "POST",
  variables: input,
});
