import { Box, Typography } from "@mui/material";
import TableComponent, { Column } from "../../components/MaterialUI/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientsRightMenu from "../../components/PageComponents/AccessControl/ClientsRightMenu";

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
    name: "Damyan Todorov",
    birthday: "2004-15-10",
    egn: "9205123456",
    last_visit: "2025-06-13",
  },
  {
    name: "Iliyan Todorov",
    birthday: "1992-05-12",
    egn: "9205123456",
    last_visit: "2025-06-13",
  },
  {
    name: "Donika Boteva",
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
export type AppRouterProps = {
  openLeftNav: boolean;
  setExtraRightNavMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setExtraTopNavMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  smMediaQuery: boolean;
  unsavedChanges: boolean;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
};
const rowsPerPage = 9;

const ClientsPage = () => {
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  console.log(refreshTable);
  const { smMediaQuery, setExtraRightNavMenu } =
    useOutletContext<AppRouterProps>();

  useEffect(() => {
    // setPageStatus(null);

    if (smMediaQuery) {
      setExtraRightNavMenu(null);
    } else {
      setExtraRightNavMenu(
        <ClientsRightMenu setRefreshTable={setRefreshTable} />
      );
    }

    return () => {
      setExtraRightNavMenu(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smMediaQuery]);
  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "1em auto" }}>
        All Registered Clients
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

export default ClientsPage;
