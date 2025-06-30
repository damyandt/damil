import { Box, Typography } from "@mui/material";
import TableComponent, { Column } from "../../components/MaterialUI/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientsRightMenu from "../../components/PageComponents/AccessControl/ClientsRightMenu";

type Client = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  subscription?: string;
};

const columns: Column<Client>[] = [
  { label: "First Name", key: "first_name" },
  { label: "Last Name", key: "last_name" },
  { label: "Phone", key: "phone" },
  { label: "Subscription", key: "subscription", align: "center" },
  // { label: "Email", key: "email", align: "right" },
];

const allRows: Client[] = [
  {
    first_name: "Damyan",
    last_name: "Todorov",
    phone: "0888123456",
    email: "damyan.todorov@example.com",
    subscription: "monthly",
  },
  {
    first_name: "Iliyan",
    last_name: "Todorov",
    phone: "0888456789",
    email: "iliyan.todorov@example.com",
    subscription: "-",
  },
  {
    first_name: "Donika",
    last_name: "Boteva",
    phone: "0899123456",
    email: "donika.boteva@example.com",
    subscription: "yearly",
  },
  {
    first_name: "Maria",
    last_name: "Georgieva",
    phone: "0888123777",
    email: "maria.georgieva@example.com",
    subscription: "monthly",
  },
  {
    first_name: "Stefan",
    last_name: "Dimitrov",
    phone: "0888888888",
    email: "stefan.dimitrov@example.com",
    subscription: "monthly",
  },
  {
    first_name: "Sasho",
    last_name: "Petrov",
    phone: "0888777666",
    email: "sasho.petrov@example.com",
    subscription: "-",
  },
  {
    first_name: "Petya",
    last_name: "Georgieva",
    phone: "0899333444",
    email: "petya.georgieva@example.com",
    subscription: "yearly",
  },
  {
    first_name: "Nikolay",
    last_name: "Ivanov",
    phone: "0899123123",
    email: "nikolay.ivanov@example.com",
    subscription: "monthly",
  },
  {
    first_name: "Ivan",
    last_name: "Petrov",
    phone: "0888123999",
    email: "ivan.petrov@example.com",
    subscription: "monthly",
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
const rowsPerPage = 8;

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
