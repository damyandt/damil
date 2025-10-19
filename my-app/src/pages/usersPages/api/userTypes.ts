import { Dayjs } from "dayjs";

export interface Business {
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

export type User = {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  birthDate?: Dayjs | null;
  createdAt?: string;
  abonnement?: "STARTER" | "GROWTH" | "PRO" | null;
  membersCount?: number;
  subscriptionActive?: boolean;
  roles: Array<
    "Facility Member" | "Facility Admin" | "System Admin" | "Facility Staff"
  >;
};
