import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Button,
  Divider,
  Stack,
  useTheme,
  alpha,
  lighten,
  darken,
} from "@mui/material";
import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { shiftHue } from "./Home";
import { useAuthedContext } from "../../context/AuthContext";

const MembersHome = () => {
  const { authedUser } = useAuthedContext();
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const colorStart = isDark
    ? shiftHue(lighten(primary, 0.1), -20)
    : shiftHue(lighten(primary, 0.1), -20);

  const colorEnd = isDark
    ? shiftHue(darken(primary, 0.2), 20)
    : shiftHue(lighten(primary, 0.3), 20);

  const classes = [
    {
      title: "Cardio Class",
      date: "Sat, Apr 11 at 8:00 PM",
      duration: "60 min",
      location: "Home Location",
      spots: 10,
    },
    {
      title: "Ashtanga Yoga",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      location: "Home Location",
      spots: 5,
    },
    {
      title: "Ashtanga Yoga",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      location: "Home Location",
      spots: 5,
    },
    {
      title: "Ashtanga Yoga",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      location: "Home Location",
      spots: 5,
    },
    {
      title: "Ashtanga Yoga",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      location: "Home Location",
      spots: 5,
    },
    {
      title: "Cardio Class",
      date: "Sat, Apr 11 at 8:00 PM",
      duration: "60 min",
      location: "Home Location",
      spots: 10,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2 }, margin: "auto" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
          color: "#fff",
          borderRadius: "20px",
          p: 3,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {`Hi, ${authedUser.firstName}!`}
          </Typography>
          <Typography variant="subtitle1">
            Ready? Get set. Sweat. Repeat!
          </Typography>
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <img
            src="/logo.png"
            alt="Damil"
            style={{ width: 120, borderRadius: "20px" }}
          />
        </Box>
      </Box>

      {/* News Card */}
      <Grid container spacing={2} py={2}>
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          borderRadius={"20px"}
          boxShadow={
            isDark
              ? `0 3px 12px ${alpha(primary, 0.3)}`
              : `0 3px 12px ${alpha("#000", 0.06)}`
          }
        >
          <Box sx={{ borderRadius: "20px", p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              News
            </Typography>
            <Typography variant="body1">
              Start working out to boost your fitness level!
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          borderRadius={"20px"}
          boxShadow={
            isDark
              ? `0 3px 12px ${alpha(primary, 0.3)}`
              : `0 3px 12px ${alpha("#000", 0.06)}`
          }
        >
          <Box sx={{ borderRadius: "20px", p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              News
            </Typography>
            <Typography variant="body1">
              2 more classes and you will reach level 4!
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          borderRadius={"20px"}
          boxShadow={
            isDark
              ? `0 3px 12px ${alpha(primary, 0.3)}`
              : `0 3px 12px ${alpha("#000", 0.06)}`
          }
        >
          <Box sx={{ borderRadius: "20px", p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              News
            </Typography>
            <Typography variant="body1">
              Start working out to boost your fitness level!
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Classes Section */}
      <Box>
        <Box
          sx={{
            border: "none",
            p: "1em 2em",
            my: 1,
            borderRadius: "20px",
            background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
            color: "#fff",
            boxShadow: `${theme.palette.customColors?.shodow}`,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(0.97)",
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Classes
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{
              mb: 2,
            }}
          >
            <Tab label="Upcoming" />
            <Tab label="Booked" />
          </Tabs>
        </Box>
        <Grid container spacing={2}>
          {classes.map((cls, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  borderRadius: "20px",
                  p: 2,
                  boxShadow: `${theme.palette.customColors?.shodow}`,
                }}
              >
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
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  {cls.spots} Spots Left
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MembersHome;
