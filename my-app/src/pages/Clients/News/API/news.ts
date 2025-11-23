import { Role } from "../../../usersPages/api/userTypes";

export interface NewsItem {
  newsId?: string | null;
  title: string;
  content: string;
  importance: "LOW" | "MEDIUM" | "HIGH";
  expiresOn: any;
  publicationType: "ALL" | "TARGETED";
  targetRoles: Role[] | [];
  targetSpecific: boolean;
  recipientsIds: number[];
  status?: "DRAFT" | "PUBLISHED" | "DELETED";
  authorId?: string;
}
