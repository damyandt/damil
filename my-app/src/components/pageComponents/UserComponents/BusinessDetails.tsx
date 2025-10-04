import { Box, Grid, IconButton, MenuItem, Typography } from "@mui/material";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import TextField from "../../MaterialUI/FormFields/TextField";
import CellRenderer from "../../MaterialUI/Table/CellRenderer";
import { useLanguageContext } from "../../../context/LanguageContext";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
// import callApi from "../../../API/callApi";
// import { Response } from "../../../Global/Types/commonTypes";
import { useAuthedContext } from "../../../context/AuthContext";
import { Fade } from "../../MaterialUI/FormFields/Fade";

type Business = {
  id?: string;
  name?: string;
  businessEmail?: string;
  address?: string;
  city?: string;
};

const BusinessDetails = () => {
  const { t } = useLanguageContext();
  const { setRefreshUserData, tenant } = useAuthedContext();
  const [saved, setSaved] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Business>>(
    tenant || {
      name: "",
      businessEmail: "",
      address: "",
      city: "",
    }
  );

  const info: { label: string; field: keyof Business }[] = [
    { label: t("Business Name"), field: "name" },
    { label: t("Business Email"), field: "businessEmail" },
    { label: t("City"), field: "city" },
    { label: t("Address"), field: "address" },
  ];

  const handleSaveChanges = async () => {
    const changes: Record<string, any> = {};

    for (const key in formData) {
      if (
        formData[key as keyof Business] !==
        tenant?.business?.[key as keyof Business]
      ) {
        changes[key] = formData[key as keyof Business];
      }
    }

    if (Object.keys(changes).length === 0) {
      console.log("No changes to update.");
      setEditMode(false);
      return;
    }

    // await callApi<Response<any>>({
    //   query: updateBusinessProfile(changes, authedUser?.business?.id || ""),
    // });

    setEditMode(false);
    setSaved(true);
    setRefreshUserData((prev: boolean) => !prev);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (field: keyof Business, value: any): void => {
    setFormData((prev: Partial<Business>) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box width={"100%"}>
      <Box
        component={"div"}
        display={"flex"}
        mb={2.8}
        sx={{ alignItems: "center", cursor: "default" }}
        gap={2}
      >
        <Typography variant="h4" gutterBottom alignSelf={"center"} margin={0}>
          {t("Business Info")}
        </Typography>
        <CustomTooltip title={editMode ? t("Save") : t("Edit")} placement="top">
          {editMode ? (
            <IconButton onClick={handleSaveChanges}>
              <SaveIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setEditMode((prev) => !prev)}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </CustomTooltip>
        <Fade in={saved}>
          <IconButton sx={{ cursor: "default" }}>
            <DoneIcon fontSize="small" color="success" />
          </IconButton>
        </Fade>
      </Box>

      <Box sx={{ minHeight: 200 }}>
        {/* {editMode ? ( */}
        <Grid container spacing={2}>
          {info.map((col) => (
            <Grid size={{ xs: 12, sm: 6 }} key={col.field}>
              <TextField
                disabled={col.field === "businessEmail" || !editMode}
                fullWidth
                label={col.label}
                onChange={(e: any) => handleChange(col.field, e.target.value)}
                value={formData ? formData[col.field] || "" : ""}
              />
            </Grid>
          ))}
        </Grid>
        {/* // ) : (
        //   <Grid container spacing={3}>
        //     {info.map((col) => (
        //       <Grid size={6} key={col.field}>
        //         <Typography variant="subtitle2" color="text.secondary">
        //           {col.label}
        //         </Typography>
        //         <CellRenderer
        //           fontWeight={400}
        //           key={col.field}
        //           value={formData ? formData[col.field] || "" : ""}
        //           dataType="string"
        //           table={false}
        //         />
        //       </Grid>
        //     ))}
        //   </Grid>
        // )} */}
      </Box>
    </Box>
  );
};

export default BusinessDetails;
