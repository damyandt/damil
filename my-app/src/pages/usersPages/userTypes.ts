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
    "Facility Member" | "Facility Admin" | "System Admin" | "Facility Staff"
  >;
};

// export type Business = {

// }
