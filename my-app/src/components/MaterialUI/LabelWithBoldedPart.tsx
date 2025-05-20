import { SerializedStyles } from "@emotion/react";
import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import cssFontStyles from "../../Global/Styles/font";
import useTheme from "@mui/material/styles/useTheme";

interface LabelWithBoldedPartProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  variant?: Variant;
  text: string | number;
  bolded: string | number;
  inverse?: boolean;
  noColumn?: boolean;
}

const LabelWithBoldedPart: React.FC<LabelWithBoldedPartProps> = ({
  className,
  variant,
  text,
  bolded,
  inverse,
  noColumn,
}) => {
  const theme = useTheme();
  const styles = { ...cssFontStyles };

  return (
    <Typography
      sx={{ color: theme.palette.customColors.greyText }}
      css={inverse ? styles.bolderText : undefined}
      className={className}
      variant={variant}
    >
      {text}
      {noColumn ? "" : ": "}
      <Typography
        sx={{ color: theme.palette.customColors.greyText }}
        css={inverse ? undefined : styles.bolderText}
        variant={variant}
        component="span"
      >
        {bolded}
      </Typography>
    </Typography>
  );
};

export default LabelWithBoldedPart;
