import React from "react";
import { MenuItem, StandardTextFieldProps } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import cssLayoutStyles from "../../../Global/Styles/layout";
import TextField from "./TextFields";
import { formFieldsCssSelectStyles } from "./formFieldsUtils";

interface SelectOption {
  value: string;
  component: React.ReactNode;
}

interface SelectDynamicProps extends Omit<StandardTextFieldProps, "variant"> {
  selectOptions: SelectOption[];
}

const SelectDynamic: React.FC<SelectDynamicProps> = ({ selectOptions, ...props }) => {
  const theme = useTheme();
  const styles = { ...formFieldsCssSelectStyles(theme), ...cssLayoutStyles };

  return (
    <TextField {...props} select>
      {selectOptions.map((option) => (
        <MenuItem
          css={[styles.listItem, styles.selectedListItem]}
          key={option.value}
          value={option.value}
        >
          {option.component}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectDynamic;
