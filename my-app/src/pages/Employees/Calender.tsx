import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/TextField";
import Button from "../../components/MaterialUI/Button";
import { useOutletContext } from "react-router-dom";
import { AppRouterProps } from "../../Layout/layoutVariables";

const EmployeeCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const calendarRef = useRef<FullCalendar | null>(null);
  const [formData, setFormData] = useState<any>({
    title: "",
    person: "",
    message: "",
  });
  const { openLeftNav } = useOutletContext<AppRouterProps>();

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || "",
        person: selectedEvent.extendedProps.person || "",
        message: selectedEvent.extendedProps.message || "",
      });
    } else {
      setFormData({ title: "", person: "", message: "" });
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
    }, 400); // adjust delay as needed to match sidebar transition

    return () => clearTimeout(timeout);
  }, [openLeftNav]);

  const handleChange = (field: string, value: string): void => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (selectedDate) {
      setEvents([
        ...events,
        {
          title: formData.title,
          person: formData.person,
          message: formData.message,
          date: selectedDate,
          backgroundColor: "#d32f2f",
          borderColor: "#d32f2f",
        },
      ]);
    }
    setOpen(false);
    setFormData({
      title: "",
      person: "",
      message: "",
    });
  };
  return (
    <Box sx={{ p: 0 }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />

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
    </Box>
  );
};

export default EmployeeCalendar;
