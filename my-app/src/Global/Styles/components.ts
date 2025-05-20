import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const cssComponentsStyles = (theme: Theme) => ({
  greyIcon: css({
    color: theme.palette.grey[800],
  }),
  iconButton: css({
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: theme.shape.borderRadius,
  }),
  infoIcon: css({
    color: theme.palette.secondary.light300,
  }),
  iconHover: css({
    "&:hover": {
      color: theme.palette.primary.main,
    },
  }),
  card: {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey["100"]
        : theme.palette.customColors.darkBackgroundColor,
    paddingBottom: 0,
  },
  tooltipStyle: css({
    borderRadius: theme.shape.borderRadius,
    paddingBottom: 4,
    paddingTop: 4,
  }),
  hoverItem: css({
    "&:hover": {
      borderRadius: theme.shape.borderRadius,
      fontWeight: "700",
    },
  }),
});

export default cssComponentsStyles;
