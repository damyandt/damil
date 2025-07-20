import React from "react";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material";
import cssComponentsStyles from "../../Global/Styles/components";
import cssLayoutStyles from "../../Global/Styles/layout";

const LoadingScreen: React.FC = () => {
  const theme = useTheme();
  const styles = { ...cssComponentsStyles(theme), ...cssLayoutStyles };

  return (
    <Box
      sx={[styles.card, styles.flexCenter]}
      component="div"
      flexDirection="column"
      minHeight="100vh"
      minWidth="100vw"
    >
      <CircularProgress />
      <Typography variant="h4" mt={2} color={"primary.main"}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
