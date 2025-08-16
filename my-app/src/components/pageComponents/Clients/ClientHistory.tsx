import { useEffect, useState } from "react";
import callApi from "../../../API/callApi";
import { Response, Row } from "../../../Global/Types/commonTypes";
import { getClientVisits } from "../../../pages/Access Control/API/getQueries";
import { useAuthedContext } from "../../../context/AuthContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { Box, ButtonGroup, Typography, useTheme } from "@mui/material";

interface ClientHistoryProps {
  rowData: Row;
}

const ClientHistory: React.FC<ClientHistoryProps> = ({ rowData }) => {
  const { setAuthedUser } = useAuthedContext();
  const [visits, setVisits] = useState<any[]>([]);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  useEffect(() => {
    const fetchAllOptions = async () => {
      try {
        const visitsRes = await callApi<Response<any>>({
          query: getClientVisits(rowData.id ?? ""),
          auth: { setAuthedUser },
        });
        console.log(visitsRes);
        setVisits(visitsRes?.data ?? []);
      } catch (error) {
        console.error("Error fetching visits for", rowData.firstName, error);
      }
    };

    fetchAllOptions();
  }, [rowData.id, rowData.firstName, setAuthedUser]);

  // Map visits to FullCalendar events
  const events = visits.map((visit) => {
    const start = dayjs(visit.checkInAt);
    const end = start.add(1, "hour"); // Add 1 hour
    return {
      title: `Check-in`,
      start: start.toISOString(),
      end: end.toISOString(), // Set end time
    };
  });

  if (!visits.length) {
    return <Typography>No visits found</Typography>;
  }
  return (
    <>
      <Box>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev next today",
            center: "title",
            right: "dayGridYear dayGridMonth dayGridWeek",
          }}
          height="65vh"
        />
      </Box>
      <Typography variant="h6">Total Visits: {visits.length}</Typography>
    </>
  );
};

export default ClientHistory;
