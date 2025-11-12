import { Box } from "@mui/system";
import ClassesContainer from "./ClassesContainer";

const TrainingsPage = () => {
  return (
    <Box
      sx={{
        minHeight: `calc(100dvh - 140px)`,
      }}
    >
      <ClassesContainer />
    </Box>
  );
};

export default TrainingsPage;
