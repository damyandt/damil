import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { getClientsTable } from "./API/getQueries";
import { useAuthedContext } from "../../context/AuthContext";
import { FormStatuses } from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { useLanguageContext } from "../../context/LanguageContext";
import RightMenu from "../../components/MaterialUI/Table/RightMenu";
import InfoIcon from "@mui/icons-material/Info";
import ClientsRightMenu from "../../components/pageComponents/Clients/ClientsRightNav";

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
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>({});
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  const { setAuthedUser } = useAuthedContext();
  const { smMediaQuery, setExtraRightNavMenu } =
    useOutletContext<AppRouterProps>();

  useEffect(() => {
    setPageStatus("loading");
    fetchData();
  }, [refreshTable]);

  useEffect(() => {
    if (smMediaQuery) {
      setExtraRightNavMenu(null);
    } else {
      setExtraRightNavMenu(
        <ClientsRightMenu
          setRefreshTable={setRefreshTable}
          columns={tableData.columns ?? []}
        />
      );
    }

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
    } catch (err) {
      console.log(err);
    }

    setPageStatus(null);
  };
  // const clientCustomActions = [
  //   {
  //     id: "newPlan",
  //     icon: <InfoIcon />,
  //     tooltip: "View Client Notes",
  //     modalTitle: "Client Notes",
  //     modalWidth: "md" as const,
  //     modalStyle: "info" as const,
  //     modalTitleIcon: "info" as const,
  //     renderContent: (rowData: any) => (
  //       <div>
  //         <h3>Notes for {rowData?.firstName}</h3>
  //         <p>{rowData?.notes || "No notes available"}</p>
  //       </div>
  //     ),
  //   },
  // ];

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
            columns={tableData.columns}
            rows={tableData.rows}
            configurations={tableData.config}
            setRefreshTable={setRefreshTable}
            title={t("All Registered Clients")}
          />
        </Box>
      )}
    </>
  );
};

export default ClientsPage;
