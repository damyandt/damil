import { Dayjs } from "dayjs";

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
  abonnement?: "Starter" | "Growth" | "Pro" | null;
  membersCount?: number;
  subscriptionActive?: boolean;
  roles: Array<
    "Facility Member" | "Facility Admin" | "System Admin" | "Facility Staff"
  >;
};
