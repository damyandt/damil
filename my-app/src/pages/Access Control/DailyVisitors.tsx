import { Box } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";

type Client = {
  name: string;
  birthday: string;
  egn: string;
  last_visit: string;
};

const columns: any = [
  { header: "Name", field: "name" },
  { header: "Birthday", field: "birthday", align: "right" },
  { header: "EGN", field: "egn", align: "right" },
  { header: "Last Visit", field: "last_visit", align: "right" },
];

const allRows: Client[] = [
  {
    name: "Preslava Todorova",
    birthday: "1992-05-12",
    egn: "9205123456",
    last_visit: "2025-06-13",
  },
  {
    name: "Danaila Todorova",
    birthday: "1988-11-23",
    egn: "8811237890",
    last_visit: "2025-06-14",
  },
  {
    name: "Stefan Dimitrov",
    birthday: "2001-04-03",
    egn: "0104031122",
    last_visit: "2025-06-15",
  },
  {
    name: "Sasho Petrov",
    birthday: "1992-05-12",
    egn: "9205123456",
    last_visit: "2025-06-13",
  },
  {
    name: "Petq Georgieva",
    birthday: "1988-11-23",
    egn: "8811237890",
    last_visit: "2025-06-14",
  },
  {
    name: "Stefan Dimitrov",
    birthday: "2001-04-03",
    egn: "0104031122",
    last_visit: "2025-06-15",
  },
  {
    name: "Nikolay Ivanov",
    birthday: "1990-02-28",
    egn: "9002284567",
    last_visit: "2025-06-12",
  },
  {
    name: "Ivan Petrov",
    birthday: "1992-05-12",
    egn: "9205123456",
    last_visit: "2025-06-13",
  },
  {
    name: "Maria Georgieva",
    birthday: "1988-11-23",
    egn: "8811237890",
    last_visit: "2025-06-14",
  },
  {
    name: "Stefan Dimitrov",
    birthday: "2001-04-03",
    egn: "0104031122",
    last_visit: "2025-06-15",
  },
  {
    name: "Sasho Petrov",
    birthday: "1992-05-12",
    egn: "9205123456",
    last_visit: "2025-06-13",
  },
  {
    name: "Petq Georgieva",
    birthday: "1988-11-23",
    egn: "8811237890",
    last_visit: "2025-06-14",
  },
  {
    name: "Stefan Dimitrov",
    birthday: "2001-04-03",
    egn: "0104031122",
    last_visit: "2025-06-15",
  },
  {
    name: "Nikolay Ivanov",
    birthday: "1990-02-28",
    egn: "9002284567",
    last_visit: "2025-06-12",
  },
];

const DailyVisitors = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const customFormat = `${year}-${month}-${day}`;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <TableComponent
        columns={columns}
        rows={allRows}
        configurations={{
          pagination: {
            pageSize: 7,
          },
        }}
        title={`All Visitors for Today(${customFormat})`}
      />
    </Box>
  );
};

export default DailyVisitors;
