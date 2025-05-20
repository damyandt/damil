import { AlertColor } from "@mui/material/Alert/Alert";

export type FormStatuses = AlertColor | "loading" | null;
export type SelectOption<T extends string = string> = { value: T; description: string };
export type SelectGroupedOption = {
  groupName: string;
  options: SelectOption[];
};
export type AutocompleteOption = SelectOption;
export type AutocompleteGroupedOption = {
  value: string;
  groupName: string;
  description: string;
};

export type DataGridDataType = "string" | "number" | "date" | "dateTime" | "boolean";
export type ObjectType = {
  [key: string]: any;
};
export type OpcParameterType = "opc-da" | "opc-ua";
