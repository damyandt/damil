import { useState } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";
import { useLanguageContext } from "../../context/LanguageContext";
import NewsSection from "../MemberView/News/NewsContainer";
import CustomModal from "../../components/MaterialUI/Modal";

import NewsForm from "../MemberView/News/NewsForm";

export interface NewsItem {
  id?: string;
  title: string;
  content: string;
  importance: "Low" | "Medium" | "High";
  expiresOn: any;
  sendToAll?: boolean;
  targetRole?: string;
  targetSpecific?: boolean;
  targetPersons?: string[];
}

const NewsManagementPage = () => {
  const { t } = useLanguageContext();

  const [newsList, _] = useState<NewsItem[]>([
    {
      id: "1",
      title: t("Donika is Back!"),
      content:
        "Taekwondo with Donika returns next week — new time slots available!",
      importance: "Medium",
      expiresOn: dayjs().add(7, "day").toISOString(),
      sendToAll: true,
      targetRole: "Member",
      targetSpecific: false,
      targetPersons: ["John Doe"],
    },
    {
      id: "2",
      title: t("Earlier Close!"),
      content: t(
        "This Friday the gym will close earlier — at 7:00 PM due to maintenance."
      ),
      importance: "High",
      expiresOn: dayjs().add(2, "day").toISOString(),
      sendToAll: true,
      targetRole: "Member",
      targetSpecific: false,
      targetPersons: ["John Doe"],
    },
  ]);

  const [open, setOpen] = useState(false);

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
        <NewsSection editable={true} news={newsList} />

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
        <NewsForm setOpen={setOpen} />
      </CustomModal>
    </Box>
  );
};

export default NewsManagementPage;
