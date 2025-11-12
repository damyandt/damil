import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  useTheme,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import CustomTooltip from "../../../components/MaterialUI/CustomTooltip";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLanguageContext } from "../../../context/LanguageContext";
import CustomModal from "../../../components/MaterialUI/Modal";
import ClassDetails from "./ClassDetails";

const ClassCard = ({
  isJoined,
  cls,
  setJoinedClasses,
  originalIndex,
}: {
  isJoined: boolean;
  cls: any;
  setJoinedClasses: any;
  originalIndex: number;
}) => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const [openDetails, setOpenDetails] = useState(false);

  const handleJoin = (index: number) => {
    setJoinedClasses((prev: any) =>
      prev.includes(index)
        ? prev.filter((i: any) => i !== index)
        : [...prev, index]
    );
  };

  const handleDetailsOpen = () => setOpenDetails(true);
  const handleDetailsClose = () => setOpenDetails(false);

  return (
    <>
      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        sx={{ cursor: "pointer" }}
        onClick={() => handleDetailsOpen()}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: "20px",
            p: 2,
            boxShadow: `${theme.palette.customColors?.shodow}`,
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: theme.palette.customColors?.shodow,
            },
          }}
        >
          {/* 🧭 Top-right action icons */}
          <Stack
            direction="row"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
            }}
          >
            <CustomTooltip title={t("View Details")} placement="left">
              <IconButton size="small" onClick={handleDetailsOpen}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </CustomTooltip>
            <CustomTooltip
              title={isJoined ? t("Leave Class") : t("Join Class")}
            >
              <IconButton
                size="small"
                color={isJoined ? "primary" : "default"}
                onClick={() => handleJoin(originalIndex)}
              >
                <EventAvailableIcon fontSize="small" />
              </IconButton>
            </CustomTooltip>
          </Stack>

          {/* 📅 Content */}
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {cls.date}
            </Typography>
          </Stack>

          <Typography variant="h6" fontWeight={600}>
            {cls.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {cls.duration} • {cls.location}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {cls.trainer}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
            {cls.spots} {t("Spots Left")}
          </Typography>
        </Box>
      </Grid>

      <CustomModal
        open={openDetails}
        onClose={handleDetailsClose}
        title={t("Class Details")}
        width="lg"
      >
        <ClassDetails
          cls={cls!}
          isJoined={cls.joined || false}
          handleDetailsClose={handleDetailsClose}
          handleJoin={() => console.warn("da")}
        />
      </CustomModal>
    </>
  );
};

export default ClassCard;
