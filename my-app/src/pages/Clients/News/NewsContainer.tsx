import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import { useLanguageContext } from "../../../context/LanguageContext";
import CustomModal from "../../../components/MaterialUI/Modal";
import CellRenderer from "../../../components/MaterialUI/Table/CellRenderer";
import NewsForm from "./NewsForm";
import NewCard from "./NewsCard";
import { NewsItem } from "./API/news";

interface NewsSectionProps {
  editable: boolean;
  news: NewsItem[]; // ideally replace `any` with your actual news type
  triggerRefetch?: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  editable = false,
  news,
  triggerRefetch,
}) => {
  const { t } = useLanguageContext();
  const [newsItems, setNewsItems] = useState<NewsItem[]>(news || []);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [formData, setFormData] = useState<NewsItem>({
    title: "",
    importance: "LOW",
    content: "",
    expiresOn: dayjs().add(7, "day"),
    publicationType: "ALL",
    targetRoles: [],
    targetSpecific: false,
    recipientsIds: [],
  });

  useEffect(() => {
    setNewsItems(news);
  }, [news]);

  const handleOpen = (mode: "edit" | "view", item?: NewsItem) => {
    mode === "edit" && setOpenEdit(true);
    mode === "view" && setOpenView(true);
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        title: "",
        importance: "LOW",
        content: "",
        expiresOn: dayjs().add(7, "day"),
        publicationType: "ALL",
        targetRoles: [],
        targetSpecific: false,
        recipientsIds: [],
      });
    }
  };

  return (
    <>
      <Grid container spacing={2} width={"100%"}>
        <AnimatePresence>
          {newsItems.map((item: NewsItem) => {
            return (
              <NewCard
                key={item.newsId}
                item={item}
                handleOpen={handleOpen}
                editable={editable}
                triggerRefetch={triggerRefetch}
              />
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
        <NewsForm
          setOpen={setOpenEdit}
          data={formData}
          triggerRefetch={triggerRefetch}
        />
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
              key={t("Title")}
              value={formData?.title || t("No Title")}
              dataType={"string"}
              table={false}
              ellipsis={false}
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
