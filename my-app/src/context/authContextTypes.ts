import { User } from "../pages/usersPages/api/userTypes";

export type DecodedJWTToken = {
  sub: string;
  exp: number;
};

export const incompleteModalFields: Array<keyof Partial<User>> = [
  "email",
  "firstName",
  "lastName",
  "username",
  "city",
  "address",
  "phone",
  "birthDate",
  "gender",
];

export const defaultHomeAnalytics: string[] = [
  "employment - STUDENT",
  "employment - REGULAR",
  "subscriptionStatus - INACTIVE",
  "subscriptionStatus - ACTIVE",
];
