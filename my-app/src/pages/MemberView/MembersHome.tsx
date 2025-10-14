import {
  Box,
  Typography,
  useTheme,
  lighten,
  darken,
  Stack,
  alpha,
  Grid,
} from "@mui/material";
import { shiftHue } from "../Home/Home";
import { useAuthedContext } from "../../context/AuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import NewsSection from "./NewsContainer";
import ClassCard from "./ClassCard";
import { useState } from "react";
import dayjs from "dayjs";

const MembersHome = () => {
  const { authedUser } = useAuthedContext();
  const { t } = useLanguageContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const [joinedClasses, setJoinedClasses] = useState<number[]>([0, 1, 2]);

  const subscription = {
    name: "Monthly",
    expiresAt: "2025-11-01",
  };

  const colorStart = isDark
    ? shiftHue(lighten(primary, 0.1), -20)
    : shiftHue(lighten(primary, 0.1), -20);

  const colorEnd = isDark
    ? shiftHue(darken(primary, 0.2), 20)
    : shiftHue(lighten(primary, 0.3), 20);
  const classes = [
    {
      title: "Taekwondo",
      date: "Sat, Oct 29 at 8:00 PM",
      duration: "60 min",
      trainer: "Donika Boteva",
      trainerInfo: {
        name: "Donika Boteva",
        avatar: "/trainers/donika.png",
        specialty: "Martial Arts & Self-Defense",
      },
      location: "Sevlievo Taekwondo Club",
      address: "123 Martial Arts St, Sevlievo, Bulgaria",
      spots: 10,
      capacity: 20,
      level: "Intermediate",
      rating: 4.8,
      reviews: [
        {
          user: "Anna",
          comment: "Great energy and clear instructions!",
          rating: 5,
        },
        { user: "Georgi", comment: "Challenging but rewarding.", rating: 4.5 },
      ],
    },
    {
      title: "Kickbox",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      trainer: "Iliyan Todorov",
      trainerInfo: {
        name: "Iliyan Todorov",
        avatar: "/trainers/iliyan.png",
        specialty: "Kickboxing & Cardio Training",
      },
      location: "Vokil Varna",
      address: "Vokil Varna",
      spots: 5,
      capacity: 15,
      level: "Advanced",
      rating: 4.6,
      reviews: [
        { user: "Petya", comment: "Intense and fun!", rating: 5 },
        { user: "Ivan", comment: "Mihail is an amazing coach!", rating: 4.5 },
      ],
    },
    {
      title: "Muay thai",
      date: "Sat, Apr 11 at 9:00 PM",
      duration: "60 min",
      trainer: "Damyan Todorov",
      trainerInfo: {
        name: "Damyan Todorov",
        avatar: "/trainers/damyan.png",
        specialty: "Fighting & Problems",
      },
      location: "Muay Thai Anton Petrov, Sofia",
      address: "Muay Thai Anton Petrov NDK, Sofia",
      spots: 5,
      capacity: 10,
      level: "Advanced",
      rating: 4.9,
      reviews: [
        {
          user: "Elena",
          comment: "Very relaxing and well-structured.",
          rating: 5,
        },
        {
          user: "Stoyan",
          comment: "Perfect for unwinding after work.",
          rating: 4.8,
        },
      ],
    },
  ];

  const displayedClasses = classes.filter((_, i) => joinedClasses.includes(i));
  return (
    <Box
      sx={{
        p: { xs: 2 },
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
          color: "#fff",
          borderRadius: "20px",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {`${t("Hi")}, ${authedUser.firstName}!`}
          </Typography>
          <Typography variant="subtitle1">
            {t("Ready? Get set. Sweat. Repeat!")}
          </Typography>
        </Box>

        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <img
            src="/damil-logo.png"
            alt="Damil"
            style={{ width: 80, borderRadius: "20px" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          borderRadius: "20px",
          p: 2.5,
          backgroundColor: isDark
            ? alpha(theme.palette.primary.dark, 0.15)
            : alpha(theme.palette.primary.light, 0.15),
          boxShadow: theme!.palette!.customColors!.shodow,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h6" fontWeight={600}>
            {t("Active Subscription")}:{" "}
            <Typography component="span" color="primary" fontWeight={700}>
              {subscription.name}
            </Typography>
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {t("Expires on")}:{" "}
            <Typography component="span" color="error" fontWeight={600}>
              {new Date(subscription.expiresAt).toLocaleDateString()}
            </Typography>
          </Typography>
        </Stack>
      </Box>

      <NewsSection
        news={[
          {
            id: "1",
            title: t("Donika is Back!"),
            content:
              "Taekwondo with Donika returns next week — new time slots available!next week — new time slots available!",
            importance: "Medium",
            expiresOn: dayjs().add(7, "day").toISOString(),
          },
          {
            id: "2",
            title: t("Earlier Close!"),
            content: t(
              "This Friday the gym will close earlier — at 7:00 PM due to maintenance."
            ),
            importance: "High",
            expiresOn: dayjs().add(2, "day").toISOString(),
          },
        ]}
      />

      <Box
        sx={{
          borderRadius: "20px",
          p: 2.5,
          backgroundColor: isDark
            ? alpha(theme.palette.primary.dark, 0.15)
            : alpha(theme.palette.primary.light, 0.15),
          boxShadow: theme!.palette!.customColors!.shodow,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h6" fontWeight={600}>
            {t("Classes this week")}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {t("Count")}:{" "}
            <Typography component="span" color="info" fontWeight={600}>
              {displayedClasses.length}
            </Typography>
          </Typography>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        {displayedClasses.length === 0 ? (
          <Grid size={12}>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              {t("No upcoming classes.")}
            </Typography>
          </Grid>
        ) : (
          displayedClasses.map((cls: any, index: any) => {
            const originalIndex = classes.indexOf(cls);

            return (
              <ClassCard
                key={index}
                isJoined={true}
                cls={cls}
                setJoinedClasses={setJoinedClasses}
                originalIndex={originalIndex}
              />
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default MembersHome;
