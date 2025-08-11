import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import { FormStatuses, Table } from "../../Global/Types/commonTypes";
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
          configurations={tableData?.config ?? {}}
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
      const data = await callApi<any>({
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
            // rows={tableData.rows}
            rows={[
              {
                id: 1,
                firstName: "Alice",
                lastName: "Johnson",
                staffRoleId: 101,
                staffRoleName: "Manager",
                phone: "+1-555-123-4567",
              },
              {
                id: 2,
                firstName: "Bob",
                lastName: "Smith",
                staffRoleId: 102,
                staffRoleName: "Supervisor",
                phone: "+1-555-987-6543",
              },
              {
                id: 3,
                firstName: "Charlie",
                lastName: "Williams",
                staffRoleId: 103,
                staffRoleName: "Technician",
                phone: "+1-555-246-8101",
              },
              {
                id: 4,
                firstName: "Dana",
                lastName: "Lee",
                staffRoleId: 104,
                staffRoleName: "HR Specialist",
                phone: "+1-555-333-7788",
              },
              {
                id: 5,
                firstName: "Ethan",
                lastName: "Nguyen",
                staffRoleId: 105,
                staffRoleName: "Administrator",
                phone: "+1-555-111-2222",
              },
            ]}
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
