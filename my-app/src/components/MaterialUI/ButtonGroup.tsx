import { SerializedStyles, css } from "@emotion/react";
import {
  ButtonGroup as MUIButtonGroup,
  ButtonGroupProps as MUIButtonGroupProps,
  Theme,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

const cssStyles = (theme: Theme) => {
  return {
    buttonGroup: css({
      width: "50%",
      "& button": {
        borderRadius: 8,
        color: theme.palette.text.primary,
        padding: theme.spacing(1),
        width: "100%",
      },
    }),
  };
};

interface ButtonGroupProps extends MUIButtonGroupProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, children, ...props }) => {
  const theme = useTheme();
  const styles = {
    ...cssStyles(theme),
  };
  return (
    <MUIButtonGroup className={className} css={[styles.buttonGroup]} {...props}>
      {children}
    </MUIButtonGroup>
  );
};

export default ButtonGroup;
