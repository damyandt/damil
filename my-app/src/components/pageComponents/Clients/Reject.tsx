import { Typography, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Grid } from "@mui/system";
import Button from "../../MaterialUI/Button";
import CellRenderer from "../../MaterialUI/Table/CellRenderer";
import { useAuthedContext } from "../../../context/AuthContext";
import callApi from "../../../API/callApi";
import { rejectClient } from "../../../pages/Access Control/API/postQueries";

const RejectClient = ({ rowData, setOpen, setRefreshTable }: any) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();

  const handleSubmit = async () => {
    const response = await callApi<any>({
      query: rejectClient(rowData.id),
      auth: { setAuthedUser },
    });
    response.success && setRefreshTable((prev: boolean) => !prev);
    response.success && setOpen(false);
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          textAlign: "center",
        }}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" gutterBottom>
            {t("Are you sure you want to reject this client?")}
          </Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {t("First Name")}:
          </Typography>
          <CellRenderer
            key={t("First Name")}
            value={rowData?.firstName || t("No First Name")}
            dataType={"enum"}
            table={false}
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {t("Last Name")}:
          </Typography>
          <CellRenderer
            key={t("Last Name")}
            value={rowData?.lastName || t("No Last Name")}
            dataType={"enum"}
            table={false}
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {t("Phone")}:
          </Typography>
          <CellRenderer
            key={t("Last Name")}
            value={rowData?.phone || t("No Number")}
            dataType={"number"}
            table={false}
          />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        spacing={2}
        display={"flex"}
        justifyContent="flex-end"
        mt={2}
      >
        <Button
          color="error"
          startIcon={<CloseIcon />}
          onClick={() => setOpen(false)}
        >
          {t("Cancel")}
        </Button>

        <Button
          color="primary"
          startIcon={<CheckIcon />}
          onClick={handleSubmit}
        >
          {t("Yes")}
        </Button>
      </Stack>
    </>
  );
};

export default RejectClient;
