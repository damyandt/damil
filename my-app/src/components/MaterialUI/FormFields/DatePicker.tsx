import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { TextFieldProps } from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material/styles";

interface DatePickerComponentProps
  extends Omit<DatePickerProps, "onChange" | "value"> {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  fullWidth?: boolean;
  margin?: TextFieldProps["margin"];
  sx?: SxProps<Theme>;
  format?: string;
  error?: boolean;
  helperText?: React.ReactNode;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  fullWidth = true,
  margin = "normal",
  format = "YYYY/MM/DD",
  sx = {},
  error,
  helperText,
  ...rest
}) => {
  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={onChange}
      format={format}
      {...rest}
      slotProps={{
        textField: {
          fullWidth,
          margin,
          variant: "outlined",
          error,
          helperText,
          sx: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
            },
            "& .MuiInputBase-root": {
              borderRadius: 4,
            },
            "& fieldset": {
              borderRadius: 0.5,
            },
            ...sx,
          },
        } as TextFieldProps,
      }}
    />
  );
};

export default DatePickerComponent;
