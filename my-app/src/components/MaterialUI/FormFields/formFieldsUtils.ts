import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export const formFieldsCssSelectStyles = (theme: Theme) => ({
  listItem: css({
    overflow: "auto",
    scrollbarWidth: "thin",
    "&:hover": {
      backgroundColor: `rgba(${theme.palette.primary.main} / 0.2) !important`,
    },
  }),
  selectedListItem: css({
    "&:focus": {
      background: `rgba(${theme.palette.primary.main} / 0.2) !important`,
    },
  }),
});
