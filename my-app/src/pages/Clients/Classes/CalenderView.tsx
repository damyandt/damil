import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { Class } from "./API/classes";
import CustomModal from "../../../components/MaterialUI/Modal";
import { useLanguageContext } from "../../../context/LanguageContext";
import ClassDetails from "./ClassDetails";

interface CalendarViewProps {
  classes: Class[];
}

const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00–22:00

const CalendarView: React.FC<CalendarViewProps> = ({ classes }) => {
  const { t } = useLanguageContext();
  // const [hourHeight, setHourHeight] = useState(60);
  const [hourHeight, setHourHeight] = useState(() => {
    const screenHeight = window.innerHeight;
    if (screenHeight < 650) return 37; // small screens
    if (screenHeight < 900) return 50; // medium screens
    if (screenHeight > 900) return 60; // big screens
    return 80; // large screens
  });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [modalData, setModalData] = useState<{
    data: Class | null;
    open: boolean;
  }>({
    data: null,
    open: false,
  });
  const colorMap: Record<string, string> = {
    Taekwondo: "#7986cb", // dusty indigo
    "Muay Thai": "#e57373", // muted coral red
    Kickbox: "#4db6ac", // soft teal-green
    Yoga: "#ba68c8", // gentle lavender purple
    Default: "#90a4ae", // soft blue-grey
  };

  const handleClose = () => {
    setModalData({
      data: null,
      open: false,
    });
  };
  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: "-50px",
          mb: 4,
        }}
      >
        <Typography variant="body2" sx={{ minWidth: 120 }}>
          {t("Hour Height:")}
        </Typography>
        <Slider
          value={hourHeight}
          onChange={(_, newValue) => setHourHeight(newValue as number)}
          step={1}
          min={30}
          max={120}
          valueLabelDisplay="auto"
          sx={{ width: 200 }}
        />
      </Box> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" sx={{ minWidth: 120 }}>
          {t("Hour Height:")}
        </Typography>
        <Slider
          value={hourHeight}
          onChange={(_, newValue) => setHourHeight(newValue as number)}
          step={1}
          min={30}
          max={120}
          valueLabelDisplay="auto"
          sx={{ width: 200 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          border: (theme) =>
            `1px solid ${
              theme.palette.mode === "dark" ? "#2b2b2bff" : "#e0e0e0"
            }`,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            width: 60,
            borderRight: (theme) =>
              `1px solid ${
                theme.palette.mode === "dark" ? "#2b2b2bff" : "#e0e0e0"
              }`,
            // borderRight: "1px solid #2b2b2bff",
            position: "relative",
          }}
        >
          <Box
            sx={{
              height: 41,
              borderBottom: (theme) =>
                `2px solid ${
                  theme.palette.mode === "dark" ? "#2b2b2bff" : "#e0e0e0"
                }`,
            }}
          />
          {hours.map((h, i) => (
            <>
              <Box
                key={h}
                sx={{
                  height: hourHeight,
                  transition: "all 0.3s ease-in-out",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "gray",
                  borderBottom: (theme) =>
                    h !== 22
                      ? `1px solid ${
                          theme.palette.mode === "dark"
                            ? "#2b2b2bff"
                            : "#e0e0e0"
                        }`
                      : "none",
                }}
              >
                {h}:00
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  transition: "all 0.3s ease-in-out",
                  top: 40 + i * hourHeight + hourHeight / 2,
                  left: 0,
                  right: 0,
                  // borderTop: "2px dotted #2b2b2b99", // semi-transparent dotted line
                }}
              />
            </>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            flex: 1,
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          {days.map((day, dayIndex) => (
            <Box
              key={day}
              sx={{
                position: "relative",
                transition: "all 0.3s ease-in-out",
                borderRight: (theme) =>
                  `1px solid ${
                    theme.palette.mode === "dark" ? "#2b2b2bff" : "#e0e0e0"
                  }`,
                "&::before": {
                  content: `"${day}"`,
                  display: "block",
                  textAlign: "center",
                  fontWeight: 600,
                  borderBottom: (theme) =>
                    `1px solid ${
                      theme.palette.mode === "dark" ? "#2b2b2bff" : "#e0e0e0"
                    }`,
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
                    transition: "all 0.3s ease-in-out",
                    top: 40 + i * hourHeight,
                    left: 0,
                    right: 0,
                    borderTop: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark" ? "#2b2b2bff" : "#e0e0e0"
                      }`,
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
                  const bgColor = colorMap[c.title] || colorMap.Default;
                  return (
                    <Box
                      key={idx}
                      onClick={() => {
                        setModalData({ data: c, open: true });
                      }}
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        transition: "all 0.3s ease-in-out",
                        top,
                        width: "100%",
                        height,
                        backgroundColor: bgColor,
                        borderRadius: 0.5,
                        color: "white",
                        fontSize: 12,
                        p: 0.5,
                        overflow: "hidden",
                        boxShadow: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
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
                      {hourHeight > 50 && (
                        <Typography
                          variant="caption"
                          bottom={0}
                          position={"absolute"}
                        >
                          {c.trainer}
                        </Typography>
                      )}
                    </Box>
                  );
                })}
            </Box>
          ))}
        </Box>
      </Box>

      <CustomModal
        open={modalData.open}
        onClose={handleClose}
        title={t("Class Details")}
        width="lg"
      >
        <ClassDetails
          cls={modalData.data!}
          isJoined={modalData.data?.joined || false}
          handleDetailsClose={handleClose}
          handleJoin={() => console.warn("da")}
        />
      </CustomModal>
    </>
  );
};

export default CalendarView;
