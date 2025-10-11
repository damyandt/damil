import { useEffect, useState } from "react";
import callApi from "../../../API/callApi";
import { Response, Row } from "../../../Global/Types/commonTypes";
import { getClientVisits } from "../../../pages/Access Control/API/getQueries";
import { useAuthedContext } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import Calendar from "../../../pages/Staff/Calender";

interface ClientHistoryProps {
  rowData: Row;
}

const ClientHistory: React.FC<ClientHistoryProps> = ({ rowData }) => {
  const { setAuthedUser } = useAuthedContext();
  const [visits, setVisits] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllOptions = async () => {
      try {
        const visitsRes = await callApi<Response<any>>({
          query: getClientVisits(rowData.id ?? ""),
          auth: { setAuthedUser },
        });
        setVisits(visitsRes?.data ?? []);
      } catch (error) {
        console.error("Error fetching visits for", rowData.firstName, error);
      }
    };

    fetchAllOptions();
  }, [rowData.id, rowData.firstName, setAuthedUser]);

  useEffect(() => {
    if (visits.length) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }, [visits]);

  const transformToEvents = (data: any[]) => {
    const result: any = {};

    data.forEach((item) => {
      const dateKey = dayjs(item.checkInAt).format("YYYY-MM-DD");

      const newEvent = {
        title: "Gym Visit",
        person: item.userId,
        message: `Checked in - Membership Id: ${item.membershipId}`,
      };

      if (!result[dateKey]) {
        result[dateKey] = [];
      }

      result[dateKey].push(newEvent);
    });

    return result;
  };

  if (!visits.length) {
    return <Typography>No visits found</Typography>;
  }
  return (
    <>
      {/* <Box
        sx={{
          // Today highlight
          "& .fc-daygrid-day.fc-day-today": {
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev next today",
            center: "title",
            right: "dayGridYear dayGridMonth dayGridWeek",
          }}
          height="65dvh"
        />
      </Box> */}
      <Calendar eventsData={transformToEvents(visits)} noAddEvent={true} />
      {/* <Typography variant="h6">Total Visits: {visits.length}</Typography> */}
    </>
  );
};

export default ClientHistory;
