import { Box, Typography } from "@mui/material";
import TableComponent, { Column } from "../../components/MaterialUI/Table";

type Client = {
  name: string;
  birthday: string; // ISO date format or string
  egn: string;
  last_visit: string; // ISO date format or readable string
};

const columns: Column<Client>[] = [
  { label: "Name", key: "name" },
  { label: "Birthday", key: "birthday", align: "right" },
  { label: "EGN", key: "egn", align: "right" },
  { label: "Last Visit", key: "last_visit", align: "right" },
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

const rowsPerPage = 9;

const DailyVisitors = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const customFormat = `${year}-${month}-${day}`;
  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "1em auto" }}>
        All Visitors for Today({customFormat})
      </Typography>
      <TableComponent
        columns={columns}
        rows={allRows}
        configurations={{
          count: allRows.length,
          rowsPerPage,
        }}
      />
    </Box>
  );
};

export default DailyVisitors;
