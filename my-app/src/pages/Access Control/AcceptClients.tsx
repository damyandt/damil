import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { FormStatuses } from "../../Global/Types/commonTypes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useLanguageContext } from "../../context/LanguageContext";
import { Row } from "../../Global/Types/commonTypes";
import AcceptClient from "../../components/pageComponents/Clients/Accept";
import RejectClient from "../../components/pageComponents/Clients/Reject";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuthedContext } from "../../context/AuthContext";
import { getClientsTable } from "./API/getQueries";
import callApi from "../../API/callApi";
import { useParams } from "react-router-dom";
export type Client = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subscription?: string;
};

const AcceptClients = () => {
  const { t } = useLanguageContext();
  const { filter } = useParams();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>({});
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  const { setAuthedUser } = useAuthedContext();

  useEffect(() => {
    setPageStatus("loading");
    fetchData();
  }, [setAuthedUser, refreshTable]);

  const fetchData = async () => {
    try {
      const data = await callApi<any>({
        query: getClientsTable(filter),
        auth: { setAuthedUser },
      });
      setTableData(data.data);
    } catch (err) {
      console.error(err);
    }

    setPageStatus(null);
  };

  return (
    <>
      {pageStatus === "loading" ? (
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            height: " -webkit-fill-available",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <TableComponent
            columns={tableData?.columns || []}
            rows={tableData?.rows || []}
            configurations={tableData?.config || {}}
            setRefreshTable={setRefreshTable}
            title={t("Accept New Clients")}
            customActions={clientCustomActions}
          />
        </Box>
      )}
    </>
  );
};

export default AcceptClients;

const clientCustomActions = [
  {
    id: "accept",
    icon: <CheckBoxIcon fontSize="small" color="success" />,
    tooltip: "Accept Client",
    modalTitle: `Accept Client`,
    modalWidth: "lg" as const,
    modalStyle: "" as const,
    modalTitleIcon: "" as const,
    renderContent: (
      rowData: Row,
      setOpen: Dispatch<SetStateAction<boolean>>,
      _: Dispatch<SetStateAction<boolean>>,
      setFinalRows: Dispatch<SetStateAction<Row[]>>
    ) => (
      <AcceptClient
        rowData={rowData}
        setFinalRows={setFinalRows}
        setOpen={setOpen}
      />
    ),
  },
  {
    id: "reject",
    icon: <DisabledByDefaultIcon fontSize="small" color="error" />,
    tooltip: "Reject Client",
    modalTitle: `Reject Client`,
    modalWidth: "lg" as const,
    modalStyle: "" as const,
    modalTitleIcon: "" as const,
    renderContent: (
      rowData: Row,
      setOpen: Dispatch<SetStateAction<boolean>>,
      _: Dispatch<SetStateAction<boolean>>,
      setFinalRows: Dispatch<SetStateAction<Row[]>>
    ) => (
      <RejectClient
        setFinalRows={setFinalRows}
        rowData={rowData}
        setOpen={setOpen}
      />
    ),
  },
];
