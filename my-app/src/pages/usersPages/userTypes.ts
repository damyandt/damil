export type Gym = {
  id?: string;
  gymName: string;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  created_at?: Date;
  membersCount?: number;
  subscriptionActive?: boolean;
};
