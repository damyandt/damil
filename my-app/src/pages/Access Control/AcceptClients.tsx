import { Box, CircularProgress } from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import callApi from "../../API/callApi";
// import { getClientsTable } from "./API/getQueries";
// import { useAuthedContext } from "../../context/AuthContext";
// import { FormStatuses } from "../../Global/Types/commonTypes";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { useLanguageContext } from "../../context/LanguageContext";
import { Row } from "../../Global/Types/commonTypes";
import AcceptClient from "../../components/pageComponents/Clients/Accept";
import RejectClient from "../../components/pageComponents/Clients/Reject";
import { Dispatch, SetStateAction } from "react";
export type Client = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subscription?: string;
};

const AcceptClients = () => {
  const { t } = useLanguageContext();
  //   const { filter } = useParams();
  //   const [refreshTable, setRefreshTable] = useState<boolean>(false);
  //   const [tableData, setTableData] = useState<any>();
  //   const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  //   const { setAuthedUser } = useAuthedContext();

  //   useEffect(() => {
  //     setPageStatus("loading");
  //     fetchData();
  //   }, [refreshTable]);

  //   const fetchData = async () => {
  //     try {
  //       const data = await callApi<any>({
  //         query: getClientsTable(filter),
  //         auth: { setAuthedUser },
  //       });
  //       setTableData(data.data);
  //     } catch (err) {
  //       console.error(err);
  //     }

  //     setPageStatus(null);
  //   };
  const tableDate: any = {
    config: {
      sortable: {
        field: "updatedAt",
        desc: true,
      },
      actions: [
        {
          id: "details",
          name: "Details",
          url: "/users/members/{id}",
        },
        //     {
        //       id: "edit",
        //       name: "Edit",
        //       url: "/users/members/{id}",
        //     },
        //     {
        //       id: "delete",
        //       name: "Delete",
        //       url: "/users/members/{id}",
        //     },
      ],
      columnsLayoutConfig: {
        columnVisibility: {
          firstName: true,
          lastName: true,
          email: true,
          gender: true,
          employment: false,
          birthDate: false,
          phone: false,
          createdAt: false,
          updatedAt: false,
        },
      },
      createFields: {
        firstName: true,
        lastName: true,
        email: true,
        gender: true,
        employment: false,
        birthDate: true,
        phone: true,
        createdAt: false,
        updatedAt: false,
      },
      pagination: {
        pageSize: 10,
      },
    },
    columns: [
      {
        field: "firstName",
        header: "First Name",
        type: "string",
        dropDownConfig: null,
      },
      {
        field: "lastName",
        header: "Last Name",
        type: "string",
        dropDownConfig: null,
      },
      {
        field: "email",
        header: "Email",
        type: "string",
        dropDownConfig: null,
      },
      {
        field: "gender",
        header: "Gender",
        type: "enum",
        dropDownConfig: {
          url: "/v1/Gender/values",
          fromAnnotation: false,
        },
      },
      {
        field: "employment",
        header: "Employment",
        type: "enum",
        dropDownConfig: {
          url: "/v1/Employment/values",
          fromAnnotation: false,
        },
      },
      {
        field: "birthDate",
        header: "Birth Date",
        type: "date",
        dropDownConfig: null,
      },
      {
        field: "phone",
        header: "Phone",
        type: "phone",
        dropDownConfig: null,
      },
      {
        field: "createdAt",
        header: "Created At",
        type: "date",
        dropDownConfig: null,
      },
      {
        field: "updatedAt",
        header: "Updated At",
        type: "date",
        dropDownConfig: null,
      },
    ],
    rows: [
      {
        firstName: "Ivan",
        lastName: "Petrov",
        email: "iv.petrov@icloud.com",
        gender: "MALE",
        employment: "STUDENT",
        birthDate: "2004-10-12T21:00:00Z",
        phone: "0893762839",
        createdAt: "2025-09-29T07:02:35.71453",
        updatedAt: "2025-09-29T07:02:35.707605",
      },
    ],
  };
  return (
    <>
      {/* {pageStatus === "loading" ? ( */}
      {false ? (
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
            columns={tableDate?.columns || []}
            rows={tableDate?.rows || []}
            configurations={tableDate?.config || {}}
            // setRefreshTable={setRefreshTable}
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
      setOpen: Dispatch<SetStateAction<boolean>>
    ) => <AcceptClient rowData={rowData} setOpen={setOpen} />,
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
      setOpen: Dispatch<SetStateAction<boolean>>
    ) => <RejectClient rowData={rowData} setOpen={setOpen} />,
  },
];
