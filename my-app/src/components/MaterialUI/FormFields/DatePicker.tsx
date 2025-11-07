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
  onEnterFunc?: () => void;
  helperText?: React.ReactNode;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  fullWidth = true,
  // margin = "none",
  format = "DD/MM/YYYY",
  sx = {},
  error,
  helperText,
  onEnterFunc,
  ...rest
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      if (onEnterFunc) onEnterFunc();
    }
  };
  const handlePopperKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.stopPropagation(); // stop event from bubbling up
      if (onEnterFunc) onEnterFunc();
      // DO NOT call e.preventDefault(), otherwise the date won't be picked
    }
  };

  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={onChange}
      format={format}
      {...rest}
      slotProps={{
        popper: {
          onKeyDown: handlePopperKeyDown,
        },
        textField: {
          fullWidth,
          // margin: margin ?? "16px 8px",
          variant: "outlined",
          error,
          helperText,
          onKeyDown: handleKeyDown,
          openPickerButton: {
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation();
              e.preventDefault();
            },
            onMouseDown: (e: React.MouseEvent) => {
              e.stopPropagation();
              e.preventDefault();
            },
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                e.preventDefault();
              }
            },
          },
          sx: {
            width: "100%",
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
