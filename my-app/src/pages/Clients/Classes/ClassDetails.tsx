import { Box, Grid, Stack } from "@mui/system";
import { Class } from "./API/classes";
import { Avatar, LinearProgress, Typography } from "@mui/material";
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
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
                {/* <img
                  src={cls.trainer || "/default-trainer.jpg"}
                  alt={cls.trainer}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                /> */}
                <Avatar
                  alt={cls?.trainer}
                  src=""
                  sx={{ width: 40, height: 40, ml: "0.4em", cursor: "pointer" }}
                >
                  {cls?.trainer?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {cls.trainer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {"Martial Arts"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

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
