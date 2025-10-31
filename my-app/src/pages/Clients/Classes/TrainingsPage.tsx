import { Box } from "@mui/system";
import ClassesContainer from "./ClassesContainer";
import { classes } from "./mockData";

const TrainingsPage = () => {
  return (
    <Box
      sx={{
        p: 1,
        minHeight: `calc(100dvh - 140px)`,
      }}
    >
      <ClassesContainer classes={classes} />
    </Box>
  );
};

export default TrainingsPage;
