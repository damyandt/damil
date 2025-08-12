import { AlertColor } from "@mui/material/Alert/Alert";

export type FormStatuses = AlertColor | "loading" | null;
export type SelectOption<T extends string = string> = {
  value: T;
  description: string;
};
export type Table = {
  config: Configuration;
  columns: Column[];
  // rows: Row[];
  rows: any;
};

export type Row = Record<string, any>[];

export type Column = {
  onCreation?: number;
  field: string;
  header: string;
  type: ColumnType;
  align?: "left" | "center" | "right";
  width?: number;
  dropDownConfig?: {
    url: string;
  };
  enumConfig?: {
    url: string;
  };
};

export interface Response<TData> {
  success: boolean;
  message: string;
  errorCode: string | null;
  data: TData;
  validationErrors: Record<string, string[]> | null;
}

export type Enum = {
  title: string;
  value: string;
};

export type ColumnType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "custom"
  | "enum"
  | "dropdown";

export type Configuration = {
  sortable?: {
    field: string;
    desc: boolean;
  };
  actions?: {
    id: string;
    name: string;
    url: string;
  }[];
  columnsLayoutConfig: {
    columnVisibility: Record<string, boolean>;
  };
  createFields?: Record<string, boolean>;
  pagination: {
    pageSize: number;
  };
};

export type AutocompleteOption = SelectOption;

export type AutocompleteGroupedOption = {
  value: string;
  groupName: string;
  description: string;
};
