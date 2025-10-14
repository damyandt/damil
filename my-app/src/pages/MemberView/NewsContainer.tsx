import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  MenuItem,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import { useLanguageContext } from "../../context/LanguageContext";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";
import DatePickerComponent from "../../components/MaterialUI/FormFields/DatePicker";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  importance: "Low" | "Medium" | "High";
  expiresOn: string;
}

const NewsSection = ({ editable, news }: any) => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const [newsItems, setNewsItems] = useState<NewsItem[]>(news || []);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    importance: "Low" | "Medium" | "High";
    expiresOn: Dayjs | null;
  }>({
    title: "",
    importance: "Low",
    content: "",
    expiresOn: dayjs().add(7, "day"),
  });

  useEffect(() => {
    setNewsItems(news);
  }, [news]);
  // Remove expired news automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setNewsItems((prev) =>
        prev.filter((n) => dayjs(n.expiresOn).isAfter(now))
      );
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  const handleRemove = (id: string) =>
    setNewsItems((prev) => prev.filter((n) => n.id !== id));

  const handleOpen = (mode: "edit" | "view", news?: NewsItem) => {
    mode === "edit" && setOpenEdit(true);
    mode === "view" && setOpenView(true);
    if (news) {
      setEditing(news);
      setFormData({
        title: news.title,
        importance: news.importance,
        content: news.content,
        expiresOn: dayjs(news.expiresOn),
      });
    } else {
      setEditing(null);
      setFormData({
        title: "",
        importance: "Low",
        content: "",
        expiresOn: dayjs().add(7, "day"),
      });
    }
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (editing) {
      setNewsItems((prev) =>
        prev.map((n) =>
          n.id === editing.id
            ? {
                ...n,
                title: formData.title,
                importance: formData.importance,
                expiresOn: formData.expiresOn?.toISOString() ?? "",
              }
            : n
        )
      );
    } else {
      setNewsItems((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title: formData.title,
          content: formData.content,
          importance: formData.importance,
          expiresOn: formData.expiresOn?.toISOString() ?? "",
        },
      ]);
    }

    setOpenEdit(false);
  };

  return (
    <>
      <Grid container spacing={2} width={"100%"}>
        <AnimatePresence>
          {newsItems.map((item) => {
            return (
              <Grid
                key={item.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "20px",
                    p: 2.5,
                    boxShadow: theme.palette.customColors?.shodow ?? 3,
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpen("view", item)}
                >
                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <IconButton
                      size="small"
                      sx={{
                        zIndex: 10,
                        "&:hover": { transform: "scale(1.04)" },
                      }}
                      onClick={() => handleOpen("view", item)}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                    {editable ? (
                      <>
                        <IconButton
                          size="small"
                          sx={{
                            zIndex: 10,
                            "&:hover": { transform: "scale(1.04)" },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen("edit", item);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            zIndex: 10,
                            "&:hover": { transform: "scale(1.04)" },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(item.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        size="small"
                        sx={{
                          zIndex: 10,
                          "&:hover": { transform: "scale(1.04)" },
                        }}
                        onClick={(e) => {
                          handleRemove(item.id);
                          e.stopPropagation();
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    mb={0.5}
                  >
                    {t("News")} - {item.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.content}
                  </Typography>

                  <Box
                    mt={1.5}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box sx={{ minWidth: 100 }}>
                      <CellRenderer
                        key={t("Importance")}
                        value={item.importance || t("No Importance")}
                        dataType={"enum"}
                        table={false}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {t("Expires")}:{" "}
                      {dayjs(item.expiresOn).format("YYYY/MM/DD")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </AnimatePresence>
      </Grid>
      <CustomModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        width="md"
        title={t("Edit")}
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
            <Button onClick={() => setOpenEdit(false)} color="error" fullWidth>
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
      <CustomModal
        open={openView}
        onClose={() => setOpenView(false)}
        width="md"
        title={t("Info")}
        paddingTop={0}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <CellRenderer
              key={t("First Name")}
              value={formData?.title || t("No Title")}
              dataType={"string"}
              table={false}
              sx={{ fontSize: 25 }}
            />
          </Grid>
          <Grid size={12}>
            <CellRenderer
              ellipsis={false}
              key={t("Content")}
              value={formData?.content || t("No Content")}
              dataType={"string"}
              table={false}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("Importance")}:
            </Typography>
            <CellRenderer
              key={t("Importance")}
              value={formData?.importance || t("No Importance")}
              dataType={"enum"}
              table={false}
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("Expires On")}:
            </Typography>
            <CellRenderer
              key={t("Expires On")}
              value={formData?.expiresOn || t("No Expires On")}
              dataType={"date"}
              table={false}
            />
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
};

export default NewsSection;
