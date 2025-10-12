import {
  TextField as MaterialTextField,
  StandardTextFieldProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// import { NumericFormat, NumericFormatProps } from "react-number-format";
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
      // InputLabelProps={{
      //   shrink: numberField ? true : undefined,
      // }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // ✅ Prevent form submission or unwanted action
          e.stopPropagation(); // ✅ Optional: block global handlers
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

// interface INumberFormatProps
//   extends Omit<NumericFormatProps<string>, "onChange"> {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
//   nothousandseparator?: "true" | "false";
//   allownegatives?: "true" | "false";
//   noDecimalLimit?: "true" | "false";
// }
// type RefType = HTMLDivElement | null;

// export const NumberFormatField = React.forwardRef<RefType, INumberFormatProps>(
//   (props, ref) => {
//     const { onChange, ...other } = props;

//     const thousandSeparator = props.nothousandseparator !== "true";
//     const decimalScale = props.noDecimalLimit === "true" ? undefined : 2;
//     const allowNegative = props.allownegatives === "true";

//     return (
//       <NumericFormat
//         {...other}
//         getInputRef={ref}
//         onValueChange={(values) => {
//           onChange({
//             target: {
//               name: props.name || "",
//               value: values.value,
//             },
//           });
//         }}
//         thousandSeparator={thousandSeparator}
//         decimalScale={decimalScale}
//         valueIsNumericString
//         allowNegative={allowNegative}
//       />
//     );
//   }
// );
