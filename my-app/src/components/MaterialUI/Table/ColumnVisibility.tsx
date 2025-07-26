import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import Button from "../Button";
import CustomModal from "../Modal";
import { useLanguageContext } from "../../../context/LanguageContext";

const ColumnVisibilityModal = ({
  open,
  onClose,
  columnVisibility,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  columnVisibility: Record<string, boolean>;
  onSave: (updated: Record<string, boolean>) => void;
}) => {
  const { t } = useLanguageContext();
  const [localVisibility, setLocalVisibility] = useState({
    ...columnVisibility,
  });

  const handleToggle = (key: string) => {
    setLocalVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    onSave(localVisibility);
    onClose();
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={t("Customize Column Visibility")}
      width={"lg"}
    >
      <Grid container spacing={2}>
        {Object.entries(localVisibility).map(([key, isVisible]) => (
          <Grid size={4}>
            <FormControlLabel
              key={key}
              control={
                <Switch
                  checked={isVisible}
                  onChange={() => handleToggle(key)}
                  color="primary"
                />
              }
              label={key}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
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
    // <Dialog  maxWidth="sm" fullWidth>
    //   <DialogTitle></DialogTitle>
    //   <DialogContent>

    //   </DialogContent>
    //   <DialogActions>
    //
    //   </DialogActions>
    // </Dialog>
  );
};

export default ColumnVisibilityModal;
