import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import { useLanguageContext } from "../../../context/LanguageContext";
import Add from "@mui/icons-material/Add";
import Classes from "./Classes";

const Trainings = () => {
  const { t } = useLanguageContext();

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        mb={0}
      >
        <Typography variant="h4" fontWeight={600}>
          {t("Trainings Center")}
        </Typography>
        <IconButton onClick={() => console.warn("da")}>
          <Add />
        </IconButton>
      </Box>
      <Classes />
    </Box>
  );
};

export default Trainings;
