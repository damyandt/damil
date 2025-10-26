import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  useTheme,
  alpha,
  FormControlLabel,
} from "@mui/material";
import {
  Add,
  Delete,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import Button from "../../../components/MaterialUI/Button";
import CustomModal from "../../../components/MaterialUI/Modal";
import TextField from "../../../components/MaterialUI/FormFields/TextField";

import { useLanguageContext } from "../../../context/LanguageContext";
import TimePicker from "../../../components/MaterialUI/FormFields/TimePicker";
import Checkbox from "../../../components/MaterialUI/FormFields/Checkbox";
import DatePickerComponent from "../../../components/MaterialUI/FormFields/DatePicker";
import Collapse from "../../../components/MaterialUI/Collapse";

export type Shift = {
  staffId: string;
  date: string; // use actual date instead of day string
  start: Dayjs | null;
  end: Dayjs | null;
};

const StaffShifts = () => {
  const theme = useTheme();
  const { t } = useLanguageContext();

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [open, setOpen] = useState(false);
  const [repeatShift, setRepeatShift] = useState(false);
  const [repeatType, setRepeatType] = useState<"Daily" | "Weekly" | "Custom">(
    "Daily"
  );
  const [repeatUntil, setRepeatUntil] = useState<Dayjs | null>(null);
  const staffList = [
    { id: "1", name: "Damyan Todorov", role: t("Front Desk") },
    { id: "2", name: "Iliyan Todorov", role: t("Front Desk") },
    { id: "3", name: "Preslava Todorova", role: t("Trainer") },
  ];

  // --- Week navigation ---
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("week")
  );
  const daysOfWeek = Array.from({ length: 7 }).map((_, i) =>
    currentWeekStart.add(i, "day")
  );

  const goToNextWeek = () => setCurrentWeekStart((prev) => prev.add(1, "week"));
  const goToPrevWeek = () =>
    setCurrentWeekStart((prev) => prev.subtract(1, "week"));

  // --- New Shift ---
  const [newShift, setNewShift] = useState<Shift>({
    staffId: "",
    date: "",
    start: null,
    end: null,
  });

  const handleChange = <K extends keyof Shift>(field: K, value: Shift[K]) => {
    setNewShift((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddShift = () => {
    if (!newShift.staffId || !newShift.start || !newShift.end) return;

    const newShifts: Shift[] = [];

    // Add the original shift
    newShifts.push(newShift);

    if (repeatShift && repeatUntil) {
      let current = dayjs(newShift.date);
      const end = dayjs(repeatUntil);

      while (current.isBefore(end, "day")) {
        if (repeatType === "Daily") {
          current = current.add(1, "day");
        } else if (repeatType === "Weekly") {
          current = current.add(1, "week");
        } else {
          // Custom logic could go here
          current = current.add(1, "day");
        }

        newShifts.push({
          ...newShift,
          date: current.format("YYYY-MM-DD"),
        });
      }
    }

    setShifts((prev) => [...prev, ...newShifts]);
    handleClose();
  };

  const handleDeleteShift = (staffId: string, date: string) => {
    setShifts((prev) =>
      prev.filter((s) => !(s.staffId === staffId && s.date === date))
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewShift({
      staffId: "",
      date: dayjs().format("YYYY-MM-DD"),
      start: null,
      end: null,
    });
  };

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={goToPrevWeek}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            {`${daysOfWeek[0].format("MMM D")} - ${daysOfWeek[6].format(
              "MMM D, YYYY"
            )}`}
          </Typography>
          <IconButton onClick={goToNextWeek}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>

        <IconButton color="primary" onClick={handleOpen}>
          <Add />
        </IconButton>
      </Box>

      {/* Calendar-style grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `200px repeat(7, 1fr)`,
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.text.primary, 0.15)}`,
        }}
      >
        {/* Header Row */}
        <Box
          sx={{
            p: 1,
            textAlign: "center",
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            fontWeight: 600,
          }}
        >
          {t("Staff")}
        </Box>
        {daysOfWeek.map((date) => (
          <Box
            key={date.toString()}
            sx={{
              p: 1,
              textAlign: "center",
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              fontWeight: 600,
            }}
          >
            <Typography>{date.format("ddd")}</Typography>
            <Typography variant="caption" color="text.secondary">
              {date.format("MMM D")}
            </Typography>
          </Box>
        ))}

        {/* Staff rows */}
        {staffList.map((staff) => (
          <Box key={staff.id} sx={{ display: "contents" }}>
            {/* Staff name */}
            <Box
              sx={{
                p: 1.5,
                fontWeight: 600,
                borderRight: `1px solid ${alpha(
                  theme.palette.text.primary,
                  0.1
                )}`,
                backgroundColor: alpha(theme.palette.primary.main, 0.03),
              }}
            >
              {staff.name}
              <br />
              <Typography variant="caption" color="text.secondary">
                {staff.role}
              </Typography>
            </Box>

            {/* Days */}
            {daysOfWeek.map((date) => {
              const dateStr = date.format("YYYY-MM-DD");
              const shift = shifts.find(
                (s) => s.staffId === staff.id && s.date === dateStr
              );
              return (
                <Box
                  key={`${staff.id}-${dateStr}`}
                  onClick={() => setOpen(true)}
                  sx={{
                    p: 1,
                    minHeight: 80,
                    borderTop: `1px solid ${alpha(
                      theme.palette.text.primary,
                      0.08
                    )}`,
                    borderRight: `1px solid ${alpha(
                      theme.palette.text.primary,
                      0.08
                    )}`,
                    backgroundColor: shift
                      ? alpha(theme.palette.success.main, 0.08)
                      : "transparent",
                    transition: "0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: shift
                        ? alpha(theme.palette.success.main, 0.15)
                        : alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  {shift ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="success.main"
                      >
                        {`${shift.start?.format("HH:mm")} - ${shift.end?.format(
                          "HH:mm"
                        )}`}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteShift(staff.id, dateStr);
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ opacity: 0.6 }}
                    >
                      {t("No shift")}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Add Shift Modal */}
      <CustomModal
        open={open}
        onClose={handleClose}
        title={t("Assign New Shift")}
        width="md"
        paddingTop={0}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              select
              label={t("Select Staff")}
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
          </Grid>

          <Grid size={12}>
            <TextField
              select
              label={t("Select Date")}
              value={newShift.date}
              onChange={(e) => handleChange("date", e.target.value)}
              fullWidth
            >
              {daysOfWeek.map((date) => (
                <MenuItem
                  key={date.toString()}
                  value={date.format("YYYY-MM-DD")}
                >
                  {date.format("dddd")}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={t("Start Time")}
              value={newShift.start}
              onChange={(value) => handleChange("start", value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={t("End Time")}
              value={newShift.end}
              onChange={(value) => handleChange("end", value)}
            />
          </Grid>
          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={repeatShift}
                  onChange={(e) => setRepeatShift(e.target.checked)}
                />
              }
              label={t("Repeat this shift")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Collapse in={repeatShift}>
              <TextField
                select
                label={t("Repeat Type")}
                value={repeatType}
                onChange={(e) =>
                  setRepeatType(e.target.value as "Daily" | "Weekly" | "Custom")
                }
                fullWidth
              >
                {["Daily", "Weekly", "Custom"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Collapse>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Collapse in={repeatShift}>
              <DatePickerComponent
                label={t("Repeat Until")}
                value={repeatUntil}
                onChange={(newValue) => setRepeatUntil(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Collapse>
          </Grid>

          <Grid size={12} mt={2}>
            <Button onClick={handleAddShift} fullWidth>
              {t("Save Shift")}
            </Button>
          </Grid>
        </Grid>
      </CustomModal>
    </Box>
  );
};

export default StaffShifts;
