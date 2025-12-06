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

// const mockResponse: any = {
//   config: {
//     sortable: {
//       field: "updatedAt",
//       desc: true,
//     },
//     actions: [
//       {
//         id: "details",
//         name: "Details",
//         url: "/members/{id}",
//       },
//       {
//         id: "edit",
//         name: "Edit",
//         url: "/members/{id}",
//       },
//       {
//         id: "delete",
//         name: "Delete",
//         url: "/members/{id}",
//       },
//     ],
//     columnsLayoutConfig: {
//       columnVisibility: {
//         id: true,
//         user: true,
//         lastName: true,
//         email: false,
//         gender: false,
//         roles: false,
//         birthDate: false,
//         phone: true,
//         createdAt: false,
//         updatedAt: false,
//         employment: false,
//         subscriptionStatus: true,
//         subscriptionPlan: false,
//         allowedVisits: false,
//         remainingVisits: false,
//       },
//     },
//     createFields: {
//       id: false,
//       user: true,
//       lastName: true,
//       email: true,
//       gender: true,
//       roles: false,
//       birthDate: true,
//       phone: true,
//       createdAt: false,
//       updatedAt: false,
//       employment: false,
//       subscriptionStatus: false,
//       subscriptionPlan: false,
//       allowedVisits: false,
//       remainingVisits: false,
//     },
//     pagination: {
//       pageSize: 10,
//     },
//   },
//   columns: [
//     {
//       field: "id",
//       header: "Id",
//       type: "object",
//       dropDownConfig: null,
//     },
//     {
//       field: "user",
//       header: "User",
//       displayName: "firstName",
//       type: "object",
//       dropDownConfig: null,
//     },
//     {
//       field: "lastName",
//       header: "Last Name",
//       type: "string",
//       dropDownConfig: null,
//     },
//     {
//       field: "email",
//       header: "Email",
//       type: "string",
//       dropDownConfig: null,
//     },
//     {
//       field: "gender",
//       header: "Gender",
//       type: "enum",
//       dropDownConfig: {
//         url: "/v1/enums/Gender",
//         fromAnnotation: false,
//       },
//     },
//     {
//       field: "roles",
//       header: "Roles",
//       type: "array",
//       dropDownConfig: null,
//     },
//     {
//       field: "birthDate",
//       header: "Birth Date",
//       type: "date",
//       dropDownConfig: null,
//     },
//     {
//       field: "phone",
//       header: "Phone",
//       type: "string",
//       dropDownConfig: null,
//     },
//     {
//       field: "createdAt",
//       header: "Created At",
//       type: "date",
//       dropDownConfig: null,
//     },
//     {
//       field: "updatedAt",
//       header: "Updated At",
//       type: "date",
//       dropDownConfig: null,
//     },
//     {
//       field: "employment",
//       header: "Employment",
//       type: "enum",
//       dropDownConfig: {
//         url: "/v1/enums/Employment",
//         fromAnnotation: false,
//       },
//     },
//     {
//       field: "subscriptionStatus",
//       header: "Subscription Status",
//       type: "enum",
//       dropDownConfig: {
//         url: "/v1/enums/SubscriptionStatus",
//         fromAnnotation: false,
//       },
//     },
//     {
//       field: "subscriptionPlan",
//       header: "Subscription Plan",
//       type: "dropdown",
//       dropDownConfig: {
//         url: "/memberships",
//         fromAnnotation: true,
//       },
//     },
//     {
//       field: "allowedVisits",
//       header: "Allowed Visits",
//       type: "number",
//       dropDownConfig: null,
//     },
//     {
//       field: "remainingVisits",
//       header: "Remaining Visits",
//       type: "number",
//       dropDownConfig: null,
//     },
//   ],
//   rows: [
//     {
//       id: "8c4baab3-dd4d-484e-8494-c01768be6a9d",
//       user: {
//         id: "8c4baab3-dd4d-484e-8494-c01768be6a9d",
//         firstName: "Damiqn",
//         lastName: "Todorovvv",
//       },
//       lastName: "Todorovvv",
//       email: "damqn_dimitrov1111@icloud.com",
//       gender: "MALE",
//       roles: ["Member"],
//       birthDate: "2004-10-14T21:00:00Z",
//       phone: "0877202011",
//       createdAt: "2025-12-04T12:56:15.146202",
//       updatedAt: "2025-12-04T12:56:16.687194",
//       employment: "STUDENT",
//       subscriptionStatus: "ACTIVE",
//       subscriptionPlan: "Monthly Subscription",
//       allowedVisits: 0,
//       remainingVisits: 0,
//     },
//     {
//       id: "93c4d19b-98c1-42ea-86dc-ae4ce38b0731",
//       user: {
//         id: "93c4d19b-98c1-42ea-86dc-ae4ce38b0731",
//         firstName: "Petar",
//         lastName: "Strahilov",
//       },
//       lastName: "Strahilov",
//       email: "p.str@abv.bg",
//       gender: "MALE",
//       roles: ["Member"],
//       birthDate: "2000-02-09T22:00:00Z",
//       phone: "08937462371",
//       createdAt: "2025-12-06T10:57:46.68566",
//       updatedAt: "2025-12-06T10:57:47.81241",
//       employment: null,
//       subscriptionStatus: "INACTIVE",
//       subscriptionPlan: null,
//       allowedVisits: 0,
//       remainingVisits: 0,
//     },
//   ],
// };

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
      <ClientsRightMenu
        columns={tableData?.columns ?? []}
        setRows={setRows}
        getEndpoint={"/members"}
      />
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
      // setTableData(mockResponse);
      // setRows(mockResponse.rows);
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
            getQuery={getClientsTable(filter)}
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
      _: React.Dispatch<React.SetStateAction<boolean>>,
      setFinalRows: React.Dispatch<React.SetStateAction<Row[]>>
    ) => (
      <NewSubscriptionPlan
        rowData={rowData}
        setOpen={setOpen}
        enumEndpoints={["memberships", "enums/Employment"]}
        setFinalRows={setFinalRows}
      />
    ),
  },
];
