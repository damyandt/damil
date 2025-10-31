import { Box, Grid, Stack } from "@mui/system";
import { Class } from "./API/classes";
import { Chip, LinearProgress, Typography } from "@mui/material";
import CellRenderer from "../../../components/MaterialUI/Table/CellRenderer";
import Button from "../../../components/MaterialUI/Button";
import { useLanguageContext } from "../../../context/LanguageContext";

const ClassDetails = ({
  cls,
  isJoined,
  handleDetailsClose,
  handleJoin,
}: {
  cls: Class;
  isJoined: boolean;
  handleDetailsClose: () => void;
  handleJoin: (originalIndex: any) => void;
}) => {
  const { t } = useLanguageContext();
  return (
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
                    boxShadow: (theme) => theme.palette.customColors?.shodow,
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
                  position: "relative",
                  width: "100%",
                  height: { xs: 250, md: 400 },
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                {/* ✅ Loading overlay */}
                {/* {loading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 10,
                      display: "flex", // ✅ centers the loader
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      transition: "opacity 0.3s ease",
                      opacity: loading ? 1 : 0,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )} */}

                {/* Map iframe */}
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
                  //   onLoad={() => setLoading(false)} // ✅ hide loader when done
                />
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
        <Button onClick={handleDetailsClose} color="error" variant="outlined">
          {t("Close")}
        </Button>
        <Button onClick={() => handleJoin(cls.id)}>
          {isJoined ? t("Leave Class") : t("Join Class")}
        </Button>
      </Stack>
    </Box>
  );
};

export default ClassDetails;
