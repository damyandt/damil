import { IconButton, Grid, Typography } from "@mui/material";
import CustomTooltip from "../../CustomTooltip";
import InfoIcon from "@mui/icons-material/Info";
import CustomModal from "../../Modal";
import { useLanguageContext } from "../../../../context/LanguageContext";
import CellRenderer from ".././CellRenderer";
import { Column, Row } from "../../../../Global/Types/commonTypes";

type DetailsActionProps = {
  selectedRow: Row | null;
  columns: Column[];
  actionUrl: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAnchorEl: React.Dispatch<
    React.SetStateAction<null | HTMLElement | "closeOnlyAnchor">
  >;
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
      >
        <Grid container spacing={2} sx={{ p: 2 }}>
          {columns
            ?.filter((col: Column) => !["actions"].includes(col.field))
            .map((col: Column) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={col.field}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t(col.header)}
                </Typography>
                <Typography>
                  <CellRenderer
                    key={col.field}
                    value={selectedRow?.[col.field as keyof Row]}
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
