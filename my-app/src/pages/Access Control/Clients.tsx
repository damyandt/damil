import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext, useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { getClientsTable } from "./API/getQueries";
import { useAuthedContext } from "../../context/AuthContext";
import { FormStatuses, Row } from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { useLanguageContext } from "../../context/LanguageContext";
import ClientsRightMenu from "../../components/pageComponents/Clients/ClientsRightNav";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import NewSubscriptionPlan from "../../components/pageComponents/Clients/NewSubscriptionPlan";
import ClientHistory from "../../components/pageComponents/Clients/ClientHistory";
export type Client = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subscription?: string;
};

const ClientsPage = () => {
  const { t } = useLanguageContext();
  const { filter } = useParams();
  const [tableData, setTableData] = useState<any>();
  const [rows, setRows] = useState<Row[]>([]);
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  const { setAuthedUser } = useAuthedContext();
  const { smMediaQuery, setExtraRightNavMenu } =
    useOutletContext<AppRouterProps>();

  useEffect(() => {
    setPageStatus("loading");
    fetchData();
  }, []);

  useEffect(() => {
    // if (smMediaQuery) {
    // setExtraRightNavMenu(null);
    // } else {
    setExtraRightNavMenu(
      <ClientsRightMenu columns={tableData?.columns ?? []} setRows={setRows} />
    );
    // }

    return () => {
      setExtraRightNavMenu(null);
    };
  }, [smMediaQuery, tableData]);

  const fetchData = async () => {
    try {
      const data = await callApi<any>({
        query: getClientsTable(filter),
        auth: { setAuthedUser },
      });
      setTableData(data.data);
      setRows(data.data.rows);
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
            rows={rows || []}
            configurations={tableData?.config || {}}
            title={t("All Registered Clients")}
            customActions={clientCustomActions}
          />
        </Box>
      )}
    </>
  );
};

export default ClientsPage;

const clientCustomActions = [
  {
    id: "history",
    icon: <RestorePageIcon fontSize="small" />,
    tooltip: "History Visits",
    modalTitle: `History Visits`,
    modalWidth: "lg" as const,
    modalStyle: "" as const,
    modalTitleIcon: "" as const,
    renderContent: (rowData: Row) => <ClientHistory rowData={rowData} />,
  },
  {
    id: "assignSubscriptionPlan",
    icon: <NextPlanIcon fontSize="small" />,
    tooltip: "Assign Subscription Plan",
    modalTitle: "Assign Subscription Plan",
    modalWidth: "lg" as const,
    modalStyle: "create" as const,
    modalTitleIcon: "create" as const,
    renderContent: (
      rowData: Row,
      setOpen: Dispatch<SetStateAction<boolean>>,
      setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>
      // setRows: React.Dispatch<React.SetStateAction<Row[]>>
    ) => (
      <NewSubscriptionPlan
        rowData={rowData}
        setOpen={setOpen}
        enumEndpoints={["memberships", "enums/Employment"]}
        refreshFunc={() => {
          setRefreshTable((prev: boolean) => !prev);
        }}
      />
    ),
  },
];
