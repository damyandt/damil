import { SerializedStyles, css } from "@emotion/react";
import {
  Switch as MuiSwitch,
  SwitchProps,
  FormControlLabel,
  Typography,
  Theme,
} from "@mui/material";
import React from "react";
import useTheme from "@mui/material/styles/useTheme";

const cssStyles = (theme: Theme) => ({
  smallSwitch: css({
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
  }),
});

interface ISwitchProps extends SwitchProps {
  label?: string | false | React.ReactNode;
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
}

const Switch: React.FC<ISwitchProps> = ({ className, label, size, ...props }) => {
  const theme = useTheme();
  const styles = { ...cssStyles(theme) };

  return label ? (
    <FormControlLabel
      className={className}
      control={
        <DefaultSwitch
          css={[size === "small" && styles.smallSwitch]}
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
  ) : (
    <DefaultSwitch
      css={[size === "small" && styles.smallSwitch]}
      size={size}
      {...props}
    />
  );
};

export default Switch;

const DefaultSwitch: React.FC<SwitchProps> = ({ ...props }) => {
  return <MuiSwitch {...props} />;
};
