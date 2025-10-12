import { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  useTheme,
  Divider,
  Typography,
  IconButton,
  LinearProgress,
  Chip,
} from "@mui/material";
import CustomTooltip from "../../../components/MaterialUI/CustomTooltip";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLanguageContext } from "../../../context/LanguageContext";
import CustomModal from "../../../components/MaterialUI/Modal";
import Button from "../../../components/MaterialUI/Button";
import CellRenderer from "../../../components/MaterialUI/Table/CellRenderer";

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
            spacing={1}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
            }}
          >
            <CustomTooltip
              title={isJoined ? t("Leave Class") : t("Join Class")}
            >
              <IconButton
                size="small"
                color={isJoined ? "success" : "primary"}
                onClick={() => handleJoin(originalIndex)}
              >
                <EventAvailableIcon fontSize="small" />
              </IconButton>
            </CustomTooltip>

            <CustomTooltip title={t("View Details")}>
              <IconButton size="small" color="info" onClick={handleDetailsOpen}>
                <InfoOutlinedIcon fontSize="small" />
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
        <Box sx={{ p: 2 }}>
          <Grid container spacing={3}>
            {/* LEFT SIDE — CLASS INFO */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2}>
                {cls.trainerInfo && (
                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? theme.palette.background.paper
                            : "#f8f9fa",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        boxShadow: (theme) =>
                          theme.palette.customColors?.shodow,
                      }}
                    >
                      <img
                        src={cls.trainerInfo.avatar || "/default-trainer.jpg"}
                        alt={cls.trainer}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {cls.trainerInfo.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cls.trainerInfo.specialty || t("Fitness Trainer")}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {t("Training")}:
                  </Typography>
                  <CellRenderer
                    key={t("Training")}
                    value={cls.title || t("No Title")}
                    dataType="string"
                    table={false}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {t("Date")}:
                  </Typography>
                  <CellRenderer
                    key={t("Date and Time")}
                    value={cls.date || t("No Date Provided")}
                    dataType="string"
                    table={false}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {t("Duration")}:
                  </Typography>
                  <CellRenderer
                    key={t("Duration")}
                    value={cls.duration || t("Unknown")}
                    dataType="enum"
                    table={false}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    {t("Trainer")}:
                  </Typography>
                  <CellRenderer
                    key={t("Trainer")}
                    value={cls.trainer || t("TBA")}
                    dataType="string"
                    table={false}
                  />
                </Grid>

                {/* DIFFICULTY LEVEL */}
                {cls.level && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      {t("Difficulty")}:
                    </Typography>
                    <Chip
                      label={cls.level}
                      color={
                        cls.level === "Beginner"
                          ? "success"
                          : cls.level === "Intermediate"
                          ? "warning"
                          : "error"
                      }
                      variant="outlined"
                    />
                  </Grid>
                )}

                {/* CAPACITY BAR */}
                {cls.capacity && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      {t("Capacity")}:
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(1 - cls.spots / cls.capacity) * 100}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "divider",
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {cls.capacity - cls.spots}/{cls.capacity} {t("booked")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>

            {/* RIGHT SIDE — MAP */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {cls.location ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: 250, md: 400 },
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: (theme) => theme.palette.customColors?.shodow,
                    }}
                  >
                    <iframe
                      title="map"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        cls.location
                      )}&output=embed`}
                    ></iframe>
                  </Box>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {t("Location map not available")}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* ACTION BUTTONS */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1.5}
            sx={{ mt: 4 }}
          >
            <Button
              onClick={handleDetailsClose}
              color="error"
              variant="outlined"
            >
              {t("Close")}
            </Button>
            <Button onClick={() => handleJoin(originalIndex)}>
              {isJoined ? t("Leave Class") : t("Join Class")}
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default ClassCard;
