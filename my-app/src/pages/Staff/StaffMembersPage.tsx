import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import { FormStatuses, Response, Table } from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { getStaffMembers } from "./API/getQueries";
import { useLanguageContext } from "../../context/LanguageContext";
import RightMenu from "../../components/MaterialUI/Table/RightMenu";

// export type StaffMember = {
//   fullName: string;
//   email: string;
// };

const StaffPage = () => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Table>();
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
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
        <RightMenu
          setRefreshTable={setRefreshTable}
          columns={tableData?.columns ?? []}
          configurations={tableData?.config}
          addNew={true}
        />
      );
    }

    return () => {
      setExtraRightNavMenu(null);
    };
  }, [smMediaQuery, tableData]);

  const fetchData = async () => {
    try {
      const data = await callApi<Response<any>>({
        query: getStaffMembers(),
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
            columns={tableData?.columns || []}
            rows={tableData?.rows || []}
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
