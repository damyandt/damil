import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useLanguageContext } from "../../../context/LanguageContext";
import NewsSection from "./NewsContainer";
import CustomModal from "../../../components/MaterialUI/Modal";

import NewsForm from "./NewsForm";
import { Response } from "../../../Global/Types/commonTypes";
import callApi from "../../../API/callApi";
import { getNews } from "./API/getQueries";
import { useAuthedContext } from "../../../context/AuthContext";
import { NewsItem } from "./API/news";

const NewsPage = () => {
  const { t } = useLanguageContext();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [newsList, setNewsItems] = useState<NewsItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthedUser } = useAuthedContext();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await callApi<Response<NewsItem[]>>({
          query: getNews(),
          auth: { setAuthedUser },
        });

        setNewsItems(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [setAuthedUser, refresh]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "-webkit-fill-available",
          alignItems: "center",
          minHeight: `calc(100dvh - 140px)`,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        mb={3}
      >
        <Typography variant="h4" fontWeight={600}>
          {t("News Management")}
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <Add />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <NewsSection
          editable={true}
          news={newsList}
          triggerRefetch={() => {
            setRefresh((prev: boolean) => !prev);
          }}
        />

        {newsList.length === 0 && (
          <Grid size={12}>
            <Box textAlign="center" mt={10}>
              <Typography color="text.secondary">
                {t("No news added yet.")}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        width="md"
        title={t("Add")}
        paddingTop={0}
      >
        <NewsForm
          setOpen={setOpen}
          triggerRefetch={() => setRefresh((prev: boolean) => !prev)}
        />
      </CustomModal>
    </Box>
  );
};

export default NewsPage;
