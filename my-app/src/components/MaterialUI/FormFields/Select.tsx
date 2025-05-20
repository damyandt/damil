import { MenuItem, StandardTextFieldProps } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import cssLayoutStyles from "../../../Global/Styles/layout";
import TextField from "./TextFields";
import { SelectOption } from "../../../Global/Types/commonTypes";
import Checkbox from "./Checkbox";
import { formFieldsCssSelectStyles } from "./formFieldsUtils";

interface SelectProps extends Omit<StandardTextFieldProps, "variant"> {
  selectOptions: SelectOption[];
  multiple?: boolean;
}

const Select: React.FC<SelectProps> = ({ selectOptions, multiple, ...props }) => {
  const theme = useTheme();
  const styles = { ...formFieldsCssSelectStyles(theme), ...cssLayoutStyles };

  return (
    <TextField
      {...props}
      select
      SelectProps={{
        multiple: !!multiple,
        renderValue: multiple
          ? (selected: unknown) => {
              const resultArr = (selected as string[]).map((item) => {
                const foundOption = selectOptions.find((option) => option.value === item);
                return foundOption?.description || item;
              });
              return resultArr.join(", ");
            }
          : undefined,
      }}
    >
      {selectOptions.map((option) => (
        <MenuItem
          css={[styles.listItem, styles.selectedListItem]}
          key={option.value}
          value={option.value}
        >
          {multiple ? (
            <Checkbox checked={(props.value as string[]).indexOf(option.value) > -1} />
          ) : null}
          {option.description}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
