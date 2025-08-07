import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import { FormStatuses } from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { getStaffRoles } from "./API/getQueries";
import { useLanguageContext } from "../../context/LanguageContext";
import RightMenu from "../../components/MaterialUI/Table/RightMenu";

export type Client = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subscription?: string;
};

const StaffRolesPage = () => {
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
        <RightMenu
          configurations={tableData.config ?? {}}
          setRefreshTable={setRefreshTable}
          columns={tableData.columns ?? []}
          configurations={tableData.config ?? {}}
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
        query: getStaffRoles(),
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
            height: "-webkit-fill-available",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <TableComponent
            columns={[
              {
                field: "id",
                header: "ID",
                type: "string",
                dropDownConfig: null,
              },
              {
                field: "name",
                header: "Name",
                type: "string",
                dropDownConfig: null,
              },
              {
                field: "type",
                header: "Type",
                type: "enum",
                dropDownConfig: {
                  url: "/v1/role-types",
                },
              },
              {
                field: "displayName",
                header: "Display Name",
                type: "string",
                dropDownConfig: null,
              },
            ]}
            rows={[
              {
                id: "predefined:TRAINER",
                name: "TRAINER",
                type: "predefined",
                displayName: "TRAINER (Predefined)",
              },
              {
                id: "predefined:RECEPTIONIST",
                name: "RECEPTIONIST",
                type: "predefined",
                displayName: "RECEPTIONIST (Predefined)",
              },
              {
                id: "predefined:CLEANER",
                name: "CLEANER",
                type: "predefined",
                displayName: "CLEANER (Predefined)",
              },
              {
                id: "predefined:PHYSIOTHERAPIST",
                name: "PHYSIOTHERAPIST",
                type: "predefined",
                displayName: "PHYSIOTHERAPIST (Predefined)",
              },
            ]}
            configurations={{}}
            // columns={tableData.columns || []}
            // rows={tableData.rows || []}
            // setRefreshTable={setRefreshTable}
            title={t("All Staff Roles")}
          />
        </Box>
      )}
    </>
  );
};

export default StaffRolesPage;
