import { Autocomplete as MuiAutocomplete } from "@mui/material";
import { SerializedStyles } from "@emotion/react";
import TextField from "./TextFields";
import isequal from "lodash.isequal";
import { AutocompleteOption } from "../../../Global/Types/commonTypes";

interface AutocompleteBaseProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  label: string;
  options: AutocompleteOption[];
  disabled?: boolean;
}

interface AutocompletePropsMultiple extends AutocompleteBaseProps {
  multiple?: true;
  value: AutocompleteOption[] | null;
  handleOnChange: (option: AutocompleteOption[]) => void | Promise<void>;
  onInputChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

interface AutocompletePropsSingle extends AutocompleteBaseProps {
  multiple?: false | undefined;
  value: AutocompleteOption | null;
  handleOnChange: (option: AutocompleteOption) => void | Promise<void>;
  onInputChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

type AutocompleteProps = AutocompletePropsMultiple | AutocompletePropsSingle;

const Autocomplete: React.FC<AutocompleteProps> = ({
  className,
  label,
  options,
  value,
  handleOnChange,
  disabled,
  multiple,
  onInputChange,
  onKeyDown,
}) => {
  return (
    <MuiAutocomplete
      className={className}
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.description}
      value={value}
      // @ts-ignore
      onChange={(_, value) => handleOnChange(value)}
      onInputChange={onInputChange}
      onKeyDown={onKeyDown}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => isequal(option, value)}
      disabled={disabled}
    />
  );
};

export default Autocomplete;
