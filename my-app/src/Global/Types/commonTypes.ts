import { AlertColor } from "@mui/material/Alert/Alert";

export type FormStatuses = AlertColor | "loading" | null;
export type SelectOption<T extends string = string> = {
  value: T;
  description: string;
};

export type AutocompleteOption = SelectOption;
export type AutocompleteGroupedOption = {
  value: string;
  groupName: string;
  description: string;
};
