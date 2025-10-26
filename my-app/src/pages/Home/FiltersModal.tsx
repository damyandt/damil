import {
  Box,
  CircularProgress,
  Grid,
  List,
  Typography,
  useTheme,
} from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import Checkbox from "../../components/MaterialUI/FormFields/Checkbox";
import Button from "../../components/MaterialUI/Button";
import { useEffect, useState } from "react";
import { Response } from "../../Global/Types/commonTypes";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import { savePreferences } from "../usersPages/api/postQueries";
import { useLanguageContext } from "../../context/LanguageContext";

interface SearchModalProps {
  openFilterConfig: boolean;
  onClose: any;
  selectedFilters: any;
  setSelectedFilters: any;
  flatData: any;
}

const FiltersModal: React.FC<SearchModalProps> = ({
  openFilterConfig,
  onClose,
  selectedFilters,
  setSelectedFilters,
  flatData,
}) => {
  const { t } = useLanguageContext();
  const theme = useTheme();
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const { setAuthedUser } = useAuthedContext();

  useEffect(() => {
    setTempSelected(selectedFilters);
  }, [openFilterConfig, selectedFilters]);

  const handleToggle = (key: string) => {
    if (tempSelected.includes(key)) {
      setTempSelected(tempSelected.filter((f) => f !== key));
    } else {
      if (tempSelected.length < 4) {
        setTempSelected([...tempSelected, key]);
      } else {
        setTempSelected([...tempSelected.slice(1), key]);
      }
    }
  };
  const handleSave = async () => {
    setSelectedFilters(tempSelected);
    await callApi<Response<any>>({
      query: savePreferences({ homeFilters: tempSelected }),
      auth: { setAuthedUser },
    });
    onClose();
  };
  if (!flatData || Object.keys(flatData).length === 0) {
    return (
      <CustomModal
        open={openFilterConfig}
        onClose={onClose}
        title={t("Customize Filters")}
        width={"lg"}
      >
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      </CustomModal>
    );
  }

  return (
    <CustomModal
      open={openFilterConfig}
      onClose={onClose}
      title={t("Customize Filters")}
      width={"lg"}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <List dense>
            {Object.entries(flatData)?.map(([field, values]) => (
              <Box key={field} sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 1.5 }}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {Object.entries(values as Record<string, number>).map(
                    ([key]) => {
                      const filterKey = `${field} - ${key}`;
                      return (
                        <Box
                          key={filterKey}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: `1px solid #ddd`,
                            borderRadius: "8px",
                            pr: 2,
                            pl: 0.5,
                            py: 0.5,
                            cursor: "pointer",
                            color: tempSelected?.includes(filterKey)
                              ? theme.palette.text.primary
                              : "inherit",
                          }}
                          onClick={() => handleToggle(filterKey)}
                        >
                          <Checkbox
                            checked={tempSelected?.includes(filterKey)}
                            size="small"
                          />
                          <Typography variant="body2">{`${key.replaceAll(
                            "_",
                            " "
                          )}`}</Typography>
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={"flex-end"}>
        <Grid>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button onClick={handleSave}>Save</Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};
export default FiltersModal;
