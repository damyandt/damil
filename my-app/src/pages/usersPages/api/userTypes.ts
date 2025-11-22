import { Dayjs } from "dayjs";
export type Gender = ["MALE", "FEMALE", "NOT_SPECIFIED"];
export type Abonnement = ["STARTER", "GROWTH", "PRO", null];
export type AbonnementDuration = ["monthly", "annual", null];
export type Role = "Member" | "Admin" | "Administrator" | "Staff";
export type RolesTypes = ["Member", "Admin", "Administrator", "Staff"];
export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "EXPIRED"
  | "CANCELLED";
export type Employment = "STUDENT" | "REGULAR" | "RETIRED" | "UNEMPLOYED";

export type Roles = RolesTypes[number];

export interface Business {
  id?: number;
  stripeAccountId?: string;
  name?: string;
  businessEmail: string;
  address?: string;
  city?: string;
  abonnement?: Abonnement;
  abonnementDuration?: AbonnementDuration;
  subscriptionValidUntil?: Dayjs | null;
  membersCount?: number;
}

export interface MemberResponse {
  subscriptionPlan?: string | null;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionStartDate?: string | Dayjs | null;
  subscriptionEndDate?: string | Dayjs | null;
  allowedVisits?: number;
  remainingVisits?: number;
  lastCheckInAt?: string | Dayjs | null;
  employment?: Employment;
}

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  gender?: Gender;
  roles: Array<Roles>;
  birthDate?: Dayjs | string | null;
  createdAt?: Dayjs | string | null;
  updatedAt?: Dayjs | string | null;
  phone?: string;
  address?: string;
  city?: string;
  passwordChanged?: boolean;
  enabled?: boolean;
  memberResponse?: MemberResponse | null;
  employeeResponse?: any | null;
}

export interface AdminDataRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DataForCardLinkStripe {
  connectedAccountId: string;
  returnUrl: string;
  refreshUrl: string;
}
