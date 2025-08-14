import { Box, List, Typography, useTheme } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import Checkbox from "../../components/MaterialUI/FormFields/Checkbox";
import Button from "../../components/MaterialUI/Button";
import { useEffect, useState } from "react";
import { Enum, EnumMap, Response } from "../../Global/Types/commonTypes";
import { getQueryOptions } from "../Access Control/API/getQueries";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import { descriptionMap } from "./Home";
import { savePreferences } from "../usersPages/api/postQuery";

interface SearchModalProps {
  openFilterConfig: boolean;
  onClose: any;
  selectedFilters: any;
  setSelectedFilters: any;
}
const FiltersModal: React.FC<SearchModalProps> = ({
  openFilterConfig,
  onClose,
  selectedFilters,
  setSelectedFilters,
}) => {
  const { setAuthedUser } = useAuthedContext();
  const theme = useTheme();
  const availableFields = [
    "Gender",
    "Employment",
    "SubscriptionStatus",
    "SubscriptionPlan",
  ];

  const [options, setOptions] = useState<EnumMap>({});
  const [tempSelected, setTempSelected] = useState<string[]>([]); // local selection

  useEffect(() => {
    setTempSelected(selectedFilters); // reset temp selection when modal opens
  }, [openFilterConfig, selectedFilters]);

  useEffect(() => {
    const fetchAllOptions = async () => {
      const optionsMap: EnumMap = {};

      for (const field of availableFields) {
        const url = `${field}/values`;
        try {
          const options = await callApi<Response<Enum[]>>({
            query: getQueryOptions(url ?? ""),
            auth: { setAuthedUser },
          });
          options.success && (optionsMap[field] = options.data);
          !options.success &&
            console.error("Error fetching options for: ", field);
        } catch (error) {
          console.error("Error fetching options for", field, error);
        }
      }
      setOptions(optionsMap);
    };

    fetchAllOptions();
  }, [openFilterConfig]);

  const handleToggle = (key: string) => {
    if (tempSelected.includes(key)) {
      setTempSelected(tempSelected.filter((f) => f !== key));
    } else {
      setTempSelected([...tempSelected, key]);
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

  return (
    <CustomModal
      open={openFilterConfig}
      onClose={onClose}
      title={"Customize Filters"}
      width={"lg"}
    >
      <List dense>
        {availableFields.map((field) => (
          <Box key={field} sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              {descriptionMap[field]}:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {options[field]?.map((opt) => {
                const key = `${field} - ${opt.value}`;
                return (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: `1px solid #ddd`,
                      borderRadius: "8px",
                      pr: 2,
                      pl: 0.5,
                      py: 0.5,
                      cursor: "pointer",
                      color: tempSelected.includes(key)
                        ? theme.palette.text.primary
                        : "inherit",
                    }}
                    onClick={() => handleToggle(key)}
                  >
                    <Checkbox
                      checked={tempSelected.includes(key)}
                      size="small"
                    />
                    <Typography variant="body2">{opt.title}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </List>

      <Button onClick={handleSave}>Save</Button>
    </CustomModal>
  );
};

export default FiltersModal;
