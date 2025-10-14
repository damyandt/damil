import { useState } from "react";
import { Box, Typography, MenuItem, Grid, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { useLanguageContext } from "../../context/LanguageContext";
import NewsSection from "../MemberView/NewsContainer";
import CustomModal from "../../components/MaterialUI/Modal";
import DatePickerComponent from "../../components/MaterialUI/FormFields/DatePicker";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  importance: "Low" | "Medium" | "High";
  expiresOn: string;
}

const NewsManagementPage = () => {
  const { t } = useLanguageContext();

  const [newsList, setNewsList] = useState<NewsItem[]>([
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
    {
      id: "3",
      title: t("Earlier Close!"),
      content: t(
        "This Friday the gym will close earlier — at 7:00 PM due to maintenance."
      ),
      importance: "Low",
      expiresOn: dayjs().add(2, "day").toISOString(),
    },
  ]);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    importance: "Low" | "Medium" | "High";
    expiresOn: Dayjs | null;
  }>({
    title: "",
    content: "",
    importance: "Low",
    expiresOn: dayjs().add(7, "day"),
  });

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    setNewsList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        importance: formData.importance,
        expiresOn: formData.expiresOn?.toISOString() ?? "",
      },
    ]);

    setOpen(false);
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      {/* Header */}
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

      {/* Animated Cards Section */}
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
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label={t("Title")}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              multiline
              label={t("Content")}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              select
              label={t("Importance")}
              value={formData.importance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  importance: e.target.value as "Low" | "Medium" | "High",
                })
              }
              fullWidth
            >
              <MenuItem value="Low">{t("Low")}</MenuItem>
              <MenuItem value="Medium">{t("Medium")}</MenuItem>
              <MenuItem value="High">{t("High")}</MenuItem>
            </TextField>
          </Grid>
          <Grid size={12}>
            <DatePickerComponent
              label={t("Expires On")}
              value={formData.expiresOn}
              onChange={(date) => setFormData({ ...formData, expiresOn: date })}
            />
          </Grid>
          <Grid size={6}>
            <Button onClick={() => setOpen(false)} color="error" fullWidth>
              {t("Cancel")}
            </Button>
          </Grid>
          <Grid size={6}>
            <Button onClick={handleSave} fullWidth>
              {t("Save")}
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
    </Box>
  );
};

export default NewsManagementPage;
