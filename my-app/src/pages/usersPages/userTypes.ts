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
  birthDate?: string | null;
  createdAt?: string;
  // created_at?: Date;
  membersCount?: number;
  subscriptionActive?: boolean;
  roles: Array<
    "FACILITY_MEMBER" | "FACILITY_ADMIN" | "SYSTEM_ADMIN" | "FACILITY_STAFF"
  >;
};

// export type Business = {

// }
