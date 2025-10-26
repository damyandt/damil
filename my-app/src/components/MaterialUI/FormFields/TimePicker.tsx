import React from "react";
import {
  TimePicker as MuiTimePicker,
  TimePickerProps,
} from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface CustomTimePickerProps extends TimePickerProps<any> {
  className?: string;
  onEnterFunc?: () => void;
  borderRadius?: number | string;
  width?: string | number;
}

const TimePicker: React.FC<CustomTimePickerProps> = ({
  className,
  onEnterFunc,
  borderRadius = 0.5,
  width = "100%",
  ...rest
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      if (onEnterFunc) onEnterFunc();
    }
  };

  return (
    <MuiTimePicker
      {...rest}
      enableAccessibleFieldDOMStructure={false}
      className={className}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField: {
          onKeyDown: handleKeyDown,
          sx: {
            width,
            "& .MuiOutlinedInput-root": {
              borderRadius: borderRadius,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1.5px",
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "error.main",
            },
          },
        },
        popper: {
          onKeyDown: handleKeyDown,
        },
      }}
    />
  );
};

export default TimePicker;
