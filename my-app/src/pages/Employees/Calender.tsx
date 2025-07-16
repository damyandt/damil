// EmployeeCalendar.tsx
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/TextField";
import Button from "../../components/MaterialUI/Button";
import { useOutletContext } from "react-router-dom";
import { AppRouterProps } from "../../Layout/layoutVariables";

const EmployeeCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const { openLeftNav } = useOutletContext<AppRouterProps>();
  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
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

  const handleSave = () => {
    if (selectedDate) {
      setEvents([
        ...events,
        {
          title: reason || "Time Off",
          date: selectedDate,
          backgroundColor: "#d32f2f",
          borderColor: "#d32f2f",
        },
      ]);
    }
    setOpen(false);
    setReason("");
  };

  return (
    <Box sx={{ p: 0 }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="auto"
      />

      <CustomModal
        title="Request Time Off"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Reason"
              margin="normal"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
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
