import React from "react";
import { Box, Typography } from "@mui/material";
import { Class } from "./API/classes";

interface CalendarViewProps {
  classes: Class[];
}

const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00–22:00

const CalendarView: React.FC<CalendarViewProps> = ({ classes }) => {
  const hourHeight = 60;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid #2b2b2bff",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: 60,
          borderRight: "1px solid #2b2b2bff",
          position: "relative",
        }}
      >
        <Box sx={{ height: 40, borderBottom: "1px solid #2b2b2bff" }} />
        {hours.map((h) => (
          <Box
            key={h}
            sx={{
              height: hourHeight,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              fontSize: 12,
              color: "gray",
            }}
          >
            {h}:00
          </Box>
        ))}
      </Box>

      <Box
        sx={{ display: "grid", flex: 1, gridTemplateColumns: "repeat(7, 1fr)" }}
      >
        {days.map((day, dayIndex) => (
          <Box
            key={day}
            sx={{
              position: "relative",
              borderRight: dayIndex === 6 ? "none" : "1px solid #2b2b2bff",
              "&::before": {
                content: `"${day}"`,
                display: "block",
                textAlign: "center",
                fontWeight: 600,
                borderBottom: "1px solid #2b2b2bff",
                lineHeight: "40px",
                height: 40,
              },
            }}
          >
            {hours.map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: 40 + i * hourHeight,
                  left: 0,
                  right: 0,
                  borderTop: "1px solid #2b2b2bff",
                }}
              />
            ))}

            {classes
              .filter((c) => {
                const d = new Date(c.date);
                const day = d.getDay() === 0 ? 6 : d.getDay() - 1; // Mon=0..Sun=6
                return day === dayIndex;
              })
              .map((c, idx) => {
                const d = new Date(c.date);
                const startHour = d.getHours() + d.getMinutes() / 60;
                const top = 40 + (startHour - 7) * hourHeight;
                const height = (Number(c.duration) / 60) * hourHeight;

                return (
                  <Box
                    key={idx}
                    sx={{
                      position: "absolute",
                      top,
                      left: "5%",
                      width: "90%",
                      height,
                      backgroundColor: "#3f51b5",
                      borderRadius: 1,
                      color: "white",
                      fontSize: 12,
                      p: 0.5,
                      overflow: "hidden",
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {c.title}
                    </Typography>
                    <Typography variant="caption">
                      {d.getHours().toString().padStart(2, "0")}:
                      {d.getMinutes().toString().padStart(2, "0")}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CalendarView;
