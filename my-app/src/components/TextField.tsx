import {
  TextField as MaterialTextField,
  StandardTextFieldProps,
} from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";
import { SerializedStyles } from "@emotion/react";
import { MAIN_COLOR } from "../Layout/layoutVariables";

interface TextFieldProps extends StandardTextFieldProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  numberField?: boolean;
  noThousandSeparator?: boolean;
  allowNegatives?: boolean;
  noDecimalLimit?: boolean;
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
          borderRadius: 2,
          backgroundColor: "#f9f9f9",

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "error.main",
            borderWidth: "1.8px",
          },
        },
      }}
      fullWidth={fullWidth}
      variant="outlined"
    />
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
