import {
  Chip,
  ListSubheader,
  MenuItem,
  Box,
  StandardTextFieldProps,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import cssLayoutStyles from "../../../Global/Styles/layout";
import TextField from "./TextFields";
import { SelectGroupedOption } from "../../../Global/Types/commonTypes";
import Checkbox from "./Checkbox";
import { formFieldsCssSelectStyles } from "./formFieldsUtils";

interface SelectGroupedProps extends Omit<StandardTextFieldProps, "variant"> {
  groupedOptions: SelectGroupedOption[];
  multiple?: boolean;
}

const SelectGrouped: React.FC<SelectGroupedProps> = ({
  groupedOptions,
  multiple,
  ...props
}) => {
  const theme = useTheme();
  const styles = { ...formFieldsCssSelectStyles(theme), ...cssLayoutStyles };

  const groupedOptionsMap = groupedOptions.reduce((acc, curr) => {
    const optionsMap = curr.options.reduce((accDeep, currDeep) => {
      return {
        ...accDeep,
        [currDeep.value]: currDeep.description,
      };
    }, {});

    return {
      ...acc,
      ...optionsMap,
    };
  }, {} as Record<string, string>);

  const renderSelectGroup = (group: SelectGroupedOption) => {
    const items = group.options.map((option) => {
      return (
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
      );
    });
    return [<ListSubheader>{group.groupName}</ListSubheader>, items];
  };

  return (
    <TextField
      {...props}
      select
      SelectProps={{
        multiple: !!multiple,
        renderValue: multiple
          ? (selected: unknown) => {
              const resultArr = (selected as string[]).map(
                (item) => groupedOptionsMap[item]
              );
              return (
                <Box component="div" sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {resultArr.map((value, index) => (
                    <Chip key={`${value}-${index}`} label={value} />
                  ))}
                </Box>
              );
            }
          : undefined,
      }}
    >
      {groupedOptions.map((group) => renderSelectGroup(group))}
    </TextField>
  );
};

export default SelectGrouped;
