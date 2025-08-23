export type Business = {
  id?: string;
  // gymName: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  created_at?: Date;
  membersCount?: number;
  subscriptionActive?: boolean;
  role: any;
  // | "FACILITY_MEMBER"
  // | "FACILITY_ADMIN"
  // | "SYSTEM_ADMIN"
  // | "FACILITY_STAFF";
};
