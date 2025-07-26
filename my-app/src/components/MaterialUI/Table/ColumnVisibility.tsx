import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Customize Column Visibility</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={1}>
          {Object.entries(localVisibility).map(([key, isVisible]) => (
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
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnVisibilityModal;
