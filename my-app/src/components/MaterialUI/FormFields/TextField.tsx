import {
  TextField as MaterialTextField,
  StandardTextFieldProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";
import { SerializedStyles } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";

interface TextFieldProps extends StandardTextFieldProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  numberField?: boolean;
  noThousandSeparator?: boolean;
  allowNegatives?: boolean;
  noDecimalLimit?: boolean;
  addOption?: boolean; // ✅ new prop
  onAddOptionClick?: () => void; // ✅ new prop
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  numberField,
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
        inputComponent: numberField ? (NumberFormatField as any) : undefined,
        sx: {
          borderRadius: 0.5,
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "error.main",
            borderWidth: "1.8px",
          },
        },
      }}
      InputLabelProps={{
        shrink: numberField ? true : undefined,
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

interface INumberFormatProps
  extends Omit<NumericFormatProps<string>, "onChange"> {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  nothousandseparator?: "true" | "false";
  allownegatives?: "true" | "false";
  noDecimalLimit?: "true" | "false";
}
type RefType = HTMLDivElement | null;

export const NumberFormatField = React.forwardRef<RefType, INumberFormatProps>(
  (props, ref) => {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name || "",
              value: values.value,
            },
          });
        }}
        thousandSeparator={Boolean(props.nothousandseparator !== "true")}
        decimalScale={Boolean(props.noDecimalLimit !== "true") ? 2 : undefined}
        valueIsNumericString
        allowNegative={Boolean(props.allownegatives === "true")}
      />
    );
  }
);
