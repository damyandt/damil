import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientsRightMenu from "../../components/PageComponents/AccessControl/ClientsRightMenu";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import { FormStatuses } from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { getEmployees } from "./API/getQueries";
import { useLanguageContext } from "../../context/LanguageContext";

export type Client = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subscription?: string;
};

const EmployeesPage = () => {
  const { t } = useLanguageContext();
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
        query: getEmployees(),
        auth: { setAuthedUser },
      });
      console.log(data.data);
      setTableData(data.data);
    } catch (err) {
      console.log(err);
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
            columns={tableData.columns}
            rows={tableData.rows}
            configurations={tableData.config}
            setRefreshTable={setRefreshTable}
            title={t("All Employees")}
          />
        </Box>
      )}
    </>
  );
};

export default EmployeesPage;
