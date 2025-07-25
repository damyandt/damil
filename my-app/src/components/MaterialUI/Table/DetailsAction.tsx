import { IconButton, Grid, Typography, Box } from "@mui/material";
import CustomTooltip from "../CustomTooltip";
import InfoIcon from "@mui/icons-material/Info";
import CustomModal from "../Modal";
import { useLanguageContext } from "../../../context/LanguageContext";
import CloseIcon from "@mui/icons-material/Close";
type DetailsActionProps = {
  selectedRow: any;
  columns: any;
  actionUrl: string;
  open: boolean;
  setOpen: any;
  setAnchorEl: any;
};

export const DetailsAction = ({
  selectedRow,
  columns,
  open,
  setOpen,
  setAnchorEl,
}: DetailsActionProps) => {
  const { t } = useLanguageContext();

  return (
    <>
      <CustomTooltip title={t("Details")} placement="bottom">
        <IconButton
          onClick={() => {
            setOpen(true);
            setAnchorEl("closeOnlyAnchor");
          }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </CustomTooltip>

      <CustomModal
        open={!!open}
        onClose={() => {
          setOpen(false);
          setAnchorEl(null);
        }}
        title={t("Details")}
        width={"lg"}
        style="info"
        titleIcon="info"
      >
        <Grid container spacing={2} sx={{ p: 2 }}>
          {columns
            ?.filter((col: any) => !["actions"].includes(col.field))
            .map((col: any) => (
              <Grid size={4} key={col.field}>
                <Typography variant="subtitle2" color="text.secondary">
                  {col.header}
                </Typography>
                <Typography variant="body1">
                  {renderText(selectedRow?.[col.field])}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </CustomModal>
    </>
  );
};

const renderText = (value: any) => {
  if (value === "N/A") {
    return (
      <Box display="flex" alignItems="center" gap={0.5}>
        <CloseIcon fontSize="small" color="error" />
      </Box>
    );
  }
  if (value === "N/A") {
    return (
      <Box display="flex" alignItems="center" gap={0.5}>
        <CloseIcon fontSize="small" color="error" />
      </Box>
    );
  }

  const enumValue = String(value).toLowerCase();

  const enumStyles: Record<
    string,
    {
      color: string;
      backgroundColor: string;
      borderColor: string;
      label: string;
    }
  > = {
    active: {
      color: "green",
      backgroundColor: "#e6ffe6",
      borderColor: "green",
      label: "Active",
    },
    inactive: {
      color: "red",
      backgroundColor: "#ffe6e6",
      borderColor: "red",
      label: "Inactive",
    },
    pending: {
      color: "#ff9800",
      backgroundColor: "#fff3e0",
      borderColor: "#ff9800",
      label: "Pending",
    },
    cancelled: {
      color: "#9e9e9e",
      backgroundColor: "#f5f5f5",
      borderColor: "#9e9e9e",
      label: "Canceled",
    },
  };

  const statusStyle = enumStyles[enumValue];

  if (statusStyle) {
    return (
      <Box
        sx={{
          display: "inline-block",
          padding: "0.5em 1em",
          border: "1px solid",
          borderRadius: "20px",
          fontWeight: 600,
          fontSize: "0.75rem",
          color: statusStyle.color,
          borderColor: statusStyle.borderColor,
          backgroundColor: statusStyle.backgroundColor,
          textTransform: "capitalize",
        }}
      >
        {statusStyle.label}
      </Box>
    );
  }

  return value ?? "-";
};
