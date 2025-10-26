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
import NewsSection from "../Clients/News/NewsContainer";
import ClassCard from "./Classes/ClassCard";
import { useEffect, useState } from "react";
import { NewsItem } from "../Clients/News/API/news";
import callApi from "../../API/callApi";
import { Response } from "../../Global/Types/commonTypes";
import { getNews } from "../Clients/News/API/getQueries";

const MembersHome = () => {
  const { authedUser } = useAuthedContext();
  const { t } = useLanguageContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const [joinedClasses, setJoinedClasses] = useState<number[]>([0, 1, 2]);
  const [newsList, setNewsItems] = useState<NewsItem[]>([]);
  const { setAuthedUser } = useAuthedContext();
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

  useEffect(() => {
    const fetchNews = async () => {
      const response = await callApi<Response<NewsItem[]>>({
        query: getNews(),
        auth: { setAuthedUser },
      });

      setNewsItems(response.data);
    };

    fetchNews();
  }, [setAuthedUser]);

  const displayedClasses = newsList.filter((_, i) => joinedClasses.includes(i));
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

      <NewsSection news={newsList} editable={false} />

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
            const originalIndex = newsList.indexOf(cls);

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
