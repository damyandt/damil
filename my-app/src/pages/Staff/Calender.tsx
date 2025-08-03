import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Grid, MenuItem, Typography, useTheme } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";
import { useOutletContext } from "react-router-dom";
import { AppRouterProps } from "../../Layout/layoutVariables";
import DatePickerComponent from "../../components/MaterialUI/FormFields/DatePicker";
import dayjs from "dayjs";

const EmployeeCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const { openLeftNav } = useOutletContext<AppRouterProps>();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [diffDays, setDiffDays] = useState<number>(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [formData, setFormData] = useState<any>({
    title: "",
    person: "",
    message: "",
    period: "",
    start: dayjs(),
    end: dayjs(),
  });

  const handleDateClick = (arg: any) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    setFormData({
      title: "",
      person: "",
      message: "",
      start: dayjs(clickedDate),
      end: dayjs(clickedDate),
    });
    setOpen(true);
  };

  useEffect(() => {
    if (!formData.start) return;

    const startDate = dayjs(formData.start);
    let newEnd = startDate;

    switch (formData.period) {
      case "Day":
        newEnd = startDate;
        break;
      case "Week":
        newEnd = startDate.add(6, "day");
        break;
      case "Month":
        newEnd = startDate.endOf("month");
        break;
      case "Custom":
        return;
      default:
        return;
    }

    setFormData((prev: any) => ({
      ...prev,
      end: newEnd,
    }));
  }, [formData.period, formData.start]);

  useEffect(() => {
    if (!formData.start || !formData.end) return;

    const startDate = dayjs(formData.start);
    const endDate = dayjs(formData.end);
    const diffDays = endDate.diff(startDate, "day");

    let newPeriod = "Custom";

    if (diffDays === 0) newPeriod = "Day";
    else if (diffDays === 6) newPeriod = "Week";
    else if (endDate.isSame(startDate.endOf("month"), "day"))
      newPeriod = "Month";

    if (newPeriod !== formData.period) {
      setFormData((prev: any) => ({
        ...prev,
        period: newPeriod,
      }));
    }
  }, [formData.end, formData.start]);

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || "",
        person: selectedEvent.extendedProps.person || "",
        period: "Day",
        message: selectedEvent.extendedProps.message || "",
        start: dayjs(selectedEvent.dateStr) || null,
        end: dayjs(selectedEvent.dateStr) || null,
      });
    }
  }, [selectedEvent, selectedDate, open]);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (calendarRef.current) {
        calendarRef.current.getApi().updateSize();
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [openLeftNav]);

  const handleChange = (field: string, value: string): void => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.start || !formData.end) return;

    const startDate = dayjs(formData.start);
    const endDate = dayjs(formData.end);
    const diffDays = endDate.diff(startDate, "day");
    setDiffDays(diffDays);
    if (diffDays > 5) return setOpenConfirm(true);
    const dates = [];
    for (
      let date = startDate;
      date.isBefore(endDate) || date.isSame(endDate, "day");
      date = date.add(1, "day")
    ) {
      dates.push(date.format("YYYY-MM-DD"));
    }

    const newEvents = dates.map((date) => ({
      title: formData.title,
      person: formData.person,
      message: formData.message,
      date: date,
      backgroundColor: "#d32f2f",
      borderColor: "#d32f2f",
    }));

    setEvents([...events, ...newEvents]);

    setOpen(false);
    setFormData({
      title: "",
      person: "",
      message: "",
      period: "",
      start: dayjs(),
      end: dayjs(),
    });
  };
  const handleConfirm = () => {
    const startDate = dayjs(formData.start);
    const endDate = dayjs(formData.end);
    const dates = [];
    for (
      let date = startDate;
      date.isBefore(endDate) || date.isSame(endDate, "day");
      date = date.add(1, "day")
    ) {
      dates.push(date.format("YYYY-MM-DD"));
    }

    const newEvents = dates.map((date) => ({
      title: formData.title,
      person: formData.person,
      message: formData.message,
      date: date,
      backgroundColor: "#d32f2f",
      borderColor: "#d32f2f",
    }));

    setEvents([...events, ...newEvents]);

    setOpen(false);
    setOpenConfirm(false);
    setFormData({
      title: "",
      person: "",
      message: "",
      period: "",
      start: dayjs(),
      end: dayjs(),
    });
  };

  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <Box sx={{ p: 0, height: "100%" }}>
      <Box
        sx={{
          // Base calendar container
          "& .fc": {
            backgroundColor: "transparent",
            color: isDark ? "#000000ff" : "#212121",
            // fontFamily: "Inter, sans-serif",
          },

          // Toolbar (month name, prev/next buttons)
          "& .fc-toolbar-title": {
            color: isDark ? "#ffffff" : "#111111",
            fontWeight: 600,
            fontSize: "1.25rem",
          },

          "& .fc-button": {
            backgroundColor: isDark ? "#333" : "#e0e0e0",
            color: isDark ? "#fff" : "#000",
            border: "none",
            "&:hover": {
              backgroundColor: isDark ? "#444" : "#d5d5d5",
            },
          },

          // Day grid cells
          "& .fc-daygrid-day": {
            backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
            borderColor: isDark ? "#333" : "#e0e0e0",
          },

          // Day numbers
          "& .fc-daygrid-day-number": {
            color: isDark ? "#bbb" : "#333",
            fontWeight: 500,
          },

          // Event styling
          "& .fc-event": {
            backgroundColor: isDark ? "#2196f3" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "2px 6px",
            fontSize: "0.85rem",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: isDark ? "#42a5f5" : "#1565c0",
            },
          },

          // Today highlight
          "& .fc-daygrid-day.fc-day-today": {
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
          "& .fc-daygrid-day.fc-day-today .fc-daygrid-day-number": {
            color: "#fff !important",
            fontWeight: 700,
          },
        }}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="92vh"
        />
      </Box>

      <CustomModal
        title="Add Event"
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedEvent(null);
        }}
        width={"lg"}
      >
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              select
              fullWidth
              label="Title"
              margin="normal"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            >
              {["Day Off", "Shift Coverage Requests"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              select
              fullWidth
              label="Person"
              margin="normal"
              value={formData.person}
              onChange={(e) => handleChange("person", e.target.value)}
            >
              {["Damyan Todorov", "Iliyan Todorov", "Preslava Todorova"].map(
                (option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              select
              fullWidth
              label="Period"
              margin="normal"
              value={formData.period}
              onChange={(e) => handleChange("period", e.target.value)}
            >
              {["Day", "Week", "Month", "Custom"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={3}>
            <DatePickerComponent
              label="Start Date"
              value={formData.start}
              onChange={(newValue: any) => handleChange("start", newValue)}
            />
          </Grid>
          <Grid size={3}>
            <DatePickerComponent
              label="End Date"
              value={formData.end}
              onChange={(newValue: any) => handleChange("end", newValue)}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Message"
              margin="normal"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} display={"flex"} justifyContent={"end"}>
          <Grid>
            <Button onClick={() => setOpen(false)} color="error">
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button onClick={handleSave}>Confirm</Button>
          </Grid>
        </Grid>
      </CustomModal>
      <CustomModal
        title="Confirm Large Date Range"
        open={openConfirm}
        onClose={handleCancelConfirm}
        width={"md"}
      >
        <Box component="div" textAlign={"center"}>
          <Typography variant="h6">
            You are setting events for <strong>{diffDays + 1}</strong> days. Are
            you sure?
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid>
            <Button color="error" onClick={handleCancelConfirm}>
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button onClick={handleConfirm}>Confirm</Button>
          </Grid>
        </Grid>
      </CustomModal>
    </Box>
  );
};

export default EmployeeCalendar;
