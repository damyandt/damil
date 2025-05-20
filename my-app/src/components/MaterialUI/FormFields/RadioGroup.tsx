import { SerializedStyles } from "@emotion/react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup as MUIRadioGroup,
  RadioGroupProps as MUIRadioGroupProps,
  Radio,
  RadioProps,
} from "@mui/material";
import { SelectOption } from "../../../Global/Types/commonTypes";

interface RadioGroupProps extends MUIRadioGroupProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  label?: string;
  radioOptions: SelectOption[];
  radioProps?: RadioProps;
  disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  className,
  radioOptions,
  label,
  radioProps,
  disabled,
  ...otherProps
}) => {
  return (
    <FormControl className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <MUIRadioGroup {...otherProps}>
        {radioOptions.map((item, index) => (
          <FormControlLabel
            key={`${item.value}-${index}`}
            value={item.value}
            control={<Radio {...radioProps} disabled={disabled} size="small" />}
            label={item.description}
          />
        ))}
      </MUIRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
