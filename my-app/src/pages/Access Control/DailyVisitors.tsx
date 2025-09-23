import { Box, CircularProgress, Grid } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useOutletContext, useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { getClientsTable, getPeriodVisitors } from "./API/getQueries";
import { useAuthedContext } from "../../context/AuthContext";
import { Column, FormStatuses, Row } from "../../Global/Types/commonTypes";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { useLanguageContext } from "../../context/LanguageContext";
import ClientsRightMenu from "../../components/pageComponents/Clients/ClientsRightNav";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import NewSubscriptionPlan from "../../components/pageComponents/Clients/NewSubscriptionPlan";
import dayjs, { Dayjs } from "dayjs";
import VisitorsRightMenu from "../../components/pageComponents/Clients/DailyVisitorsRightMenu";
export type Client = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subscription?: string;
};

const DailyVisitors = () => {
  const today = dayjs().startOf("day");
  const { t } = useLanguageContext();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>();
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  const [startDate, setStartDate] = useState<Dayjs>(today);
  const [endDate, setEndDate] = useState<Dayjs>(today);
  const { setAuthedUser, authedUser } = useAuthedContext();
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
        <VisitorsRightMenu
          setRefreshTable={setRefreshTable}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
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
        query: getPeriodVisitors(
          authedUser.id || "",
          startDate.format("YYYY-MM-DD"),
          endDate.format("YYYY-MM-DD")
        ),
        auth: { setAuthedUser },
      });
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
            configurations={tableData?.config || {}}
            setRefreshTable={setRefreshTable}
            title={`${t("Visits")} (${startDate.format("YYYY-MM-DD")} - ${endDate.format("YYYY-MM-DD")})`}
            customActions={clientCustomActions}
          />
        </Box>
      )}
    </>
  );
};

export default DailyVisitors;

const clientCustomActions = [
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
      columns: Column[],
      setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>
    ) => (
      <NewSubscriptionPlan
        rowData={rowData}
        setOpen={setOpen}
        columns={columns}
        setRefreshTable={setRefreshTable}
      />
    ),
  },
];
