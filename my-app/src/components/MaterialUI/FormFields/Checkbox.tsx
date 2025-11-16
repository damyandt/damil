import { SerializedStyles, css } from "@emotion/react";
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
  Theme,
  useTheme,
} from "@mui/material";
import React from "react";

const cssStyles = (theme: Theme) => ({
  smallCheckbox: css({
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
  }),
});

interface ICheckboxProps extends CheckboxProps {
  label?: string | false | React.ReactNode;
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  styling?: string;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  className,
  label,
  size,
  ...props
}) => {
  const theme = useTheme();
  const styles = { ...cssStyles(theme) };

  if (label)
    return (
      <FormControlLabel
        className={className}
        control={
          <DefaultCheckbox
            css={[size === "small" && styles.smallCheckbox]}
            size={size}
            {...props}
          />
        }
        label={
          typeof label === "string" ? (
            <Typography
              variant="body1"
              color={props.disabled ? "textSecondary" : "textPrimary"}
            >
              {label}
            </Typography>
          ) : (
            label
          )
        }
      />
    );

  return (
    <DefaultCheckbox
      css={[size === "small" && styles.smallCheckbox]}
      size={size}
      onChange={(e) => e.stopPropagation()}
      {...props}
    />
  );
};

export default Checkbox;

const DefaultCheckbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return <MuiCheckbox {...props} />;
};
