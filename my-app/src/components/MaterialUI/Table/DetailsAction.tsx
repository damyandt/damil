import { IconButton, Grid, Typography } from "@mui/material";
import CustomTooltip from "../CustomTooltip";
import InfoIcon from "@mui/icons-material/Info";
import CustomModal from "../Modal";
import { useLanguageContext } from "../../../context/LanguageContext";
import CellRenderer from "./CellRenderer";

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
                <Typography>
                  <CellRenderer
                    key={col.field}
                    value={selectedRow?.[col.field as keyof any]}
                    dataType={col.type}
                    table={false}
                  />
                </Typography>
              </Grid>
            ))}
        </Grid>
      </CustomModal>
    </>
  );
};
