import { IconButton, Typography } from "@mui/material";
import { Box, Grid, useTheme } from "@mui/system";
import CellRenderer from "../../../components/MaterialUI/Table/CellRenderer";
import { useLanguageContext } from "../../../context/LanguageContext";
import { motion } from "framer-motion";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
const NewCard = ({ item, handleOpen, editable }: any) => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const handleRemove = (id: string) => {
    if (!id) return;
  };
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
          minHeight: 180,
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
                  handleRemove(item.id!);
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
                handleRemove(item.id!);
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
          overflow={"hidden"}
        >
          {t("News")}{" "}
          <CellRenderer
            key={t("Title")}
            value={item.title || t("No Title")}
            dataType={"string"}
            table={false}
          />
          {/* {item.title} */}
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
          <Typography
            variant="caption"
            color="text.secondary"
            textAlign={"end"}
          >
            {t("Expires")}: {dayjs(item.expiresOn).format("YYYY/MM/DD")}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default NewCard;
