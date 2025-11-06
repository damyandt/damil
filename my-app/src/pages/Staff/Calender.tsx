import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useTheme,
  MenuItem,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import DatePickerComponent from "../../components/MaterialUI/FormFields/DatePicker";
import CustomModal from "../../components/MaterialUI/Modal";
import dayjs, { Dayjs } from "dayjs";
import Button from "../../components/MaterialUI/Button";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../context/LanguageContext";

const Calendar = ({
  eventsData,
  noAddEvent = false,
}: {
  eventsData?: any;
  noAddEvent?: boolean;
}) => {
  const theme = useTheme();
  const today = new Date();
  const { t } = useLanguageContext();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<any>(eventsData || {});
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [diffDays, setDiffDays] = useState<number>(0);
  const [formData, setFormData] = useState<any>({
    title: "",
    person: "",
    message: "",
    period: "",
    start: dayjs(),
    end: dayjs(),
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDay = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = firstDay.getDay(); // 0 = Sunday

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleOpenDialog = (day: any) => {
    const dateKey: any = day
      ? dayjs(new Date(currentYear, currentMonth, day))
      : "";

    const selectedDay = dayjs(dateKey);

    setFormData((prev: any) => ({
      ...prev,
      start: selectedDay,
      end: selectedDay,
    }));

    setOpenDialog(true);
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

  // Generate calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  const handleChange = (field: string, value: string | Dayjs | null): void => {
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

    const updatedEvents = { ...events };

    for (
      let date = startDate;
      date.isBefore(endDate) || date.isSame(endDate, "day");
      date = date.add(1, "day")
    ) {
      const key = date.format("YYYY-MM-DD");
      const newEvent = {
        title: formData.title,
        person: formData.person,
        message: formData.message,
      };

      if (!updatedEvents[key]) updatedEvents[key] = [];
      updatedEvents[key].push(newEvent);
    }

    setEvents(updatedEvents);
    setOpenDialog(false);
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
    const updatedEvents = { ...events };

    for (
      let date = startDate;
      date.isBefore(endDate) || date.isSame(endDate, "day");
      date = date.add(1, "day")
    ) {
      const key = date.format("YYYY-MM-DD");
      const newEvent = {
        title: formData.title,
        person: formData.person,
        message: formData.message,
      };

      if (!updatedEvents[key]) updatedEvents[key] = [];
      updatedEvents[key].push(newEvent);
    }

    setEvents(updatedEvents);

    setOpenDialog(false);
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
    <Box
      sx={{
        // p: 4,
        borderRadius: 3,
        backdropFilter: "blur(6px)",
        mx: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        alignContent={"center"}
        mb={3}
      >
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIos fontSize="small" />
        </IconButton>

        <Typography variant="h4" fontWeight={600}>
          {monthNames[currentMonth]} {currentYear}
        </Typography>

        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Box>

      {/* Weekday labels */}
      <Grid container>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Grid size={12 / 7} key={day}>
            <Typography align="center" fontWeight={600} mb={1}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Days grid */}
      <Grid container spacing={1}>
        {calendarDays.map((day, index) => {
          const dateKey = day
            ? dayjs(new Date(currentYear, currentMonth, day)).format(
                "YYYY-MM-DD"
              )
            : "";

          const dayEvents = events[dateKey] || [];
          const isToday =
            day &&
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <Grid size={12 / 7} key={index}>
              <Box
                sx={{
                  minHeight: 100,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                  p: 1,
                  backgroundColor: isToday
                    ? alpha(theme.palette.primary.main, 0.1)
                    : "transparent",
                  cursor: day ? "pointer" : "default",
                  "&:hover": {
                    backgroundColor: day
                      ? alpha(theme.palette.primary.main, 0.05)
                      : "transparent",
                  },
                  transition: "0.2s",
                }}
                onClick={() => !noAddEvent && day && handleOpenDialog(day)}
              >
                <Typography fontWeight={600}>{day}</Typography>

                {dayEvents.map((ev: any, i: any) => (
                  <Typography
                    key={i}
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      px: 1,
                      borderRadius: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    }}
                  >
                    {ev.title}
                  </Typography>
                ))}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <CustomModal
        title={t("Add Event")}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        width={"lg"}
      >
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              select
              fullWidth
              label={t("Title")}
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
              label={t("Person")}
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
              label={t("Period")}
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
              sx={{ width: "100%", margin: 0 }}
              label={t("Start Date")}
              value={formData.start}
              onChange={(newValue: any) => handleChange("start", newValue)}
            />
          </Grid>

          <Grid size={3}>
            <DatePickerComponent
              sx={{ width: "100%", margin: 0 }}
              label={t("End Date")}
              value={formData.end}
              onChange={(newValue: Dayjs | null) =>
                handleChange("end", newValue)
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label={t("Message")}
              margin="normal"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} display={"flex"} justifyContent={"end"}>
          <Grid>
            <Button onClick={() => setOpenDialog(false)} color="error">
              {t("Cancel")}
            </Button>
          </Grid>
          <Grid>
            <Button onClick={handleSave}>{t("Confirm")}</Button>
          </Grid>
        </Grid>
      </CustomModal>
      <CustomModal
        title={t("Confirm Large Date Range")}
        open={openConfirm}
        onClose={handleCancelConfirm}
        width={"md"}
      >
        <Box component="div" textAlign={"center"}>
          <Typography variant="h6">
            {t("You are setting events for")} <strong>{diffDays + 1}</strong>{" "}
            {t("days")}. {t("Are you sure?")}
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid>
            <Button color="error" onClick={handleCancelConfirm}>
              {t("Cancel")}
            </Button>
          </Grid>
          <Grid>
            <Button onClick={handleConfirm}>{t("Confirm")}</Button>
          </Grid>
        </Grid>
      </CustomModal>
    </Box>
  );
};

export default Calendar;
