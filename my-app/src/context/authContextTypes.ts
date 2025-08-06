import { Alert } from "../Api/Rules/apiRulesSnippets";

export type DecodedJWTToken = {
  sub: string;
  exp: number;
};

export type UserPermissions = {
  view: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
  share: boolean;
};

export type ModuleUserRole = {
  role: string;
  permissions: UserPermissions;
};

export type AuthedUser = {
  id: string;
  family_name: string;
  given_name: string;
  title: string;
  position: string;
  user_name: string;
  agreed_to_news: boolean;
  is_verified: boolean;
  roles: { [module: string]: ModuleUserRole };
};

export type ProfilePicture = {
  url: string;
};

export type AlertData = {
  read: Alert[];
  unread: Alert[];
};
