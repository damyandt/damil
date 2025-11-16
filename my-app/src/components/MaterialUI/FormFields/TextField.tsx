import {
  TextField as MaterialTextField,
  StandardTextFieldProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { SerializedStyles } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";

interface TextFieldProps extends StandardTextFieldProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  onEnterFunc?: () => void;
  noThousandSeparator?: boolean;
  allowNegatives?: boolean;
  noDecimalLimit?: boolean;
  addOption?: boolean;
  onAddOptionClick?: () => void;
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  onEnterFunc,
  inputProps = {},
  InputProps = {},
  fullWidth = true,
  noThousandSeparator,
  allowNegatives,
  noDecimalLimit,
  addOption,
  onAddOptionClick,
  children,
  ...rest
}) => {
  return (
    <MaterialTextField
      className={className}
      {...rest}
      inputProps={{
        ...inputProps,
        nothousandseparator: noThousandSeparator ? "true" : "false",
        allownegatives: allowNegatives ? "true" : "false",
        nodecimallimit: noDecimalLimit ? "true" : "false",
      }}
      InputProps={{
        ...InputProps,
        // inputComponent: numberField ? (NumberFormatField as any) : undefined,
        sx: {
          borderRadius: 0.5,
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "error.main",
            borderWidth: "1.8px",
          },
        },
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          onEnterFunc?.();
        }
      }}
      fullWidth={fullWidth}
      variant="outlined"
      select={rest.select}
    >
      {children}

      {rest.select && addOption && (
        <MenuItem
          value="__add__"
          onClick={(e) => {
            e.preventDefault();
            if (onAddOptionClick) onAddOptionClick();
          }}
        >
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add new..." />
        </MenuItem>
      )}
    </MaterialTextField>
  );
};

export default TextField;
