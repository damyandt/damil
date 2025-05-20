import { Box, Autocomplete as MuiAutocomplete, Theme } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { SerializedStyles, css } from "@emotion/react";
import TextField from "./TextFields";
import isequal from "lodash.isequal";
import { AutocompleteGroupedOption } from "../../../Global/Types/commonTypes";

const cssStyles = (theme: Theme) => ({
  autocompleteGroup: css({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.light,
  }),
  autocompleteList: css({
    padding: 0,
  }),
});

interface AutocompleteBaseProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  label: string;
  options: AutocompleteGroupedOption[];
  disabled?: boolean;
  disabledOptions?: string[];
}

interface AutocompletePropsMultiple extends AutocompleteBaseProps {
  multiple?: true;
  value: AutocompleteGroupedOption[] | null;
  handleOnChange: (option: AutocompleteGroupedOption[]) => void | Promise<void>;
}

interface AutocompletePropsSingle extends AutocompleteBaseProps {
  multiple?: false | undefined;
  value: AutocompleteGroupedOption | null;
  handleOnChange: (option: AutocompleteGroupedOption) => void | Promise<void>;
}

type AutocompleteProps = AutocompletePropsMultiple | AutocompletePropsSingle;

const AutocompleteGrouped: React.FC<AutocompleteProps> = ({
  className,
  label,
  options,
  value,
  handleOnChange,
  disabled,
  multiple,
  disabledOptions,
}) => {
  const theme = useTheme();
  const styles = {
    ...cssStyles(theme),
  };

  return (
    <MuiAutocomplete
      className={className}
      multiple={multiple}
      options={options}
      groupBy={(option) => option.groupName}
      getOptionLabel={(option) => option.description}
      value={value}
      // @ts-ignore
      onChange={(_, value) => handleOnChange(value)}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderGroup={(params) => (
        <li key={params.key}>
          <Box component="div" css={styles.autocompleteGroup}>
            {params.group}
          </Box>
          <ul css={styles.autocompleteList}>{params.children}</ul>
        </li>
      )}
      isOptionEqualToValue={(option, value) => isequal(option, value)}
      disabled={disabled}
      getOptionDisabled={(option) =>
        Boolean(disabledOptions?.length && disabledOptions.includes(option.value))
      }
    />
  );
};

export default AutocompleteGrouped;
