import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import Button from "../../../components/MaterialUI/Button";
import CustomTooltip from "../../../components/MaterialUI/CustomTooltip";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "../../../components/MaterialUI/Modal";
import TextField from "../../../components/MaterialUI/FormFields/TextField";
import ShiftCell from "./ShiftCell";
import { useLanguageContext } from "../../../context/LanguageContext";
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


type Shift = {
  staffId: string;
  day: string;
  start: Dayjs | null; // Use Dayjs type here
  end: Dayjs | null;
};

const StaffShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useLanguageContext()
  const staffList = [
    { id: "1", name: "Damyan Todorov", role: t("Front Desk") },
    { id: "2", name: "Iliyan Todorov", role: t("Front Desk") },
  ];
  const [newShift, setNewShift] = useState<Shift>({
    staffId: "",
    day: "Mon",
    start: null,
    end: null,
  });

  const closeModal = () => {
    setOpen(false);
    setNewShift({ staffId: "", day: "Mon", start: null, end: null });
  };

  const handleChange = (field: keyof Shift, value: string) => {
    setNewShift((prev) => ({ ...prev, [field]: value }));
  };

  const addShift = () => {
    if (!newShift.staffId || !newShift.start || !newShift.end) return;
    setShifts((prev) => [...prev, newShift]);
    closeModal();
  };
  const getShift = (staffId: string, day: string): Shift | undefined => {
    return shifts.find(
      (shift) => shift.staffId === staffId && shift.day === day
    );
  };
  const handleDeleteShift = (staffId: string, day: string) => {
    setShifts((prevShifts) =>
      prevShifts.filter(
        (shift) => !(shift.staffId === staffId && shift.day === day)
      )
    );
  };

  return (
    <>
      <Grid container p={4}>
        <Grid size={12}>
          <Typography variant="h4" mb={4} textAlign={"center"}>
            {t("Staff Scheduling")}
          </Typography>
        </Grid>
        <Grid position={"absolute"}>
          <CustomTooltip title={t("Assign Shift")} placement="right">
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </CustomTooltip>
        </Grid>

        <Grid size={12}>
          <Box
            display="grid"
            gridTemplateColumns={`150px repeat(7, 1fr)`}
            gap={1}
          >
            <Box />
            {daysOfWeek.map((day) => (
              <Typography key={day} align="center" fontWeight="bold">
                {day}
              </Typography>
            ))}

            {staffList.map((staff) => (
              <Box key={staff.id} display="contents">
                <Typography fontWeight="bold" alignSelf={"center"}>
                  {staff.name}
                </Typography>
                {daysOfWeek.map((day) => {
                  const shift = shifts.find(
                    (s) => s.staffId === staff.id && s.day === day
                  );
                  return (
                    <ShiftCell
                      key={`${staff.id}-${day}`}
                      staff={staff}
                      day={day}
                      s
                      shift={shift}
                      onDelete={handleDeleteShift}
                    />
                  );
                })}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title={t("Assign New Shift")}
      >
        <TextField
          select
          label="Staff"
          value={newShift.staffId}
          onChange={(e) => handleChange("staffId", e.target.value)}
          fullWidth
        >
          {staffList.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={t("Day")}
          value={newShift.day}
          onChange={(e) => handleChange("day", e.target.value)}
          fullWidth
        >
          {daysOfWeek.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>

        <TimePicker
          label={t("Select Time")}
          value={newShift.start}
          onChange={(newValue: any) => handleChange("start", newValue)}
        />
        <TimePicker
          label={t("End Time")}
          value={newShift.end}
          onChange={(newValue: any) => handleChange("end", newValue)}
        />

        <Button onClick={addShift}>{t("Save Shift")}</Button>
      </CustomModal>
    </>
  );
};

export default StaffShifts;
