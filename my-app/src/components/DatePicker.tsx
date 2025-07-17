import { DatePicker } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";
import { SxProps } from "@mui/system";
import React from "react";

interface DatePickerComponentProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  fullWidth?: boolean;
  margin?: TextFieldProps["margin"];
  sx?: SxProps;
  format?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  fullWidth = true,
  margin = "normal",
  format = "DD/MM/YYYY",
  sx = {},
}) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          fullWidth,
          margin,
          variant: "outlined",
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
          inputProps: {
            format: "DD/MM/YYYY",
          },
        },
      }}
    />
  );
};

export default DatePickerComponent;
