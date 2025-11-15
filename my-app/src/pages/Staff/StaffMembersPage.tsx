import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import {
  FormStatuses,
  Response,
  Row,
  Table,
} from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { getStaffMembers } from "./API/getQueries";
import { useLanguageContext } from "../../context/LanguageContext";
import RightMenu from "../../components/MaterialUI/Table/RightMenu";

const StaffPage = () => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [tableData, setTableData] = useState<Table>();
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  const { smMediaQuery, setExtraRightNavMenu } =
    useOutletContext<AppRouterProps>();

  useEffect(() => {
    setPageStatus("loading");
    fetchData();
  }, [refreshTable]);

  useEffect(() => {
    setExtraRightNavMenu(
      <RightMenu
        title={t("Employee")}
        columns={tableData?.columns ?? []}
        configurations={tableData?.config}
        addNew={true}
        createUrl="employees"
        setRows={setRows}
      />
    );

    return () => {
      setExtraRightNavMenu(null);
    };
  }, [smMediaQuery, tableData]);

  const fetchData = async () => {
    try {
      const response = await callApi<Response<any>>({
        query: getStaffMembers(),
        auth: { setAuthedUser },
      });
      setRows(response.data.rows);
      setTableData(response.data);
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
            configurations={tableData?.config}
            setRefreshTable={setRefreshTable}
            title={t("All Staff Members")}
          />
        </Box>
      )}
    </>
  );
};

export default StaffPage;
