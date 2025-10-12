import { Grid, Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";

const NewsSection = () => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const [newsItems, setNewsItems] = useState([
    t("Taekwondo with Donika returns next week — new time slots available!"),
    t(
      "This Friday the gym will close earlier — at 7:00 PM due to maintenance."
    ),
    t("Showers will be unavailable on Monday morning due to repairs."),
  ]);

  const handleRemove = (index: number) => {
    setNewsItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Grid container spacing={2}>
      <AnimatePresence>
        {newsItems.map((item, index) => (
          <Grid
            key={item}
            size={{ xs: 12, sm: 6, md: 4 }}
            borderRadius={"20px"}
            component={motion.div}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "20px",
                p: 2,
                boxShadow: theme!.palette!.customColors!.shodow,

                // boxShadow: isDark
                //   ? `0 3px 12px ${alpha(primary, 0.3)}`
                //   : `0 3px 12px ${alpha("#000", 0.06)}`,
              }}
            >
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  color: "text.secondary",
                  "&:hover": { color: "error.main", transform: "scale(1.1)" },
                  transition: "all 0.2s ease",
                }}
                onClick={() => handleRemove(index)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              <Typography variant="subtitle2" color="text.secondary">
                {t("News")}
              </Typography>
              <Typography variant="body1">{item}</Typography>
            </Box>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};

export default NewsSection;
