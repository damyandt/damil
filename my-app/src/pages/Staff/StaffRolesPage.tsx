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
          setRefreshTable={setRefreshTable}
          columns={tableData.columns ?? []}
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
            height: " -webkit-fill-available",
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
            // columns={tableData.columns}
            // rows={tableData.rows}
            configurations={tableData.config}
            setRefreshTable={setRefreshTable}
            title={t("All Staff Roles")}
          />
        </Box>
      )}
    </>
  );
};

export default StaffRolesPage;
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { Dayjs } from "dayjs";

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const staffList = [
//   { id: "1", name: "John Doe", role: "Trainer" },
//   { id: "2", name: "Jane Smith", role: "Front Desk" },
// ];

// type Shift = {
//   staffId: string;
//   day: string;
//   start: Dayjs | null; // Use Dayjs type here
//   end: Dayjs | null;
// };

// const StaffRolesPage = () => {
//   const [shifts, setShifts] = useState<Shift[]>([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newShift, setNewShift] = useState<Shift>({
//     staffId: "",
//     day: "Mon",
//     start: null,
//     end: null,
//   });

//   const openModal = () => setModalOpen(true);
//   const closeModal = () => {
//     setModalOpen(false);
//     setNewShift({ staffId: "", day: "Mon", start: null, end: null });
//   };

//   const handleChange = (field: keyof Shift, value: string) => {
//     setNewShift((prev) => ({ ...prev, [field]: value }));
//   };

//   const addShift = () => {
//     if (!newShift.staffId || !newShift.start || !newShift.end) return;
//     setShifts((prev) => [...prev, newShift]);
//     closeModal();
//   };

//   const getStaffName = (id: string) => staffList.find((s) => s.id === id)?.name;
//   return (
//     <Box p={4}>
//       <Typography variant="h4" mb={2}>
//         Staff Scheduling
//       </Typography>
//       <Button variant="contained" onClick={openModal} sx={{ mb: 3 }}>
//         + Assign Shift
//       </Button>

//       <Box display="grid" gridTemplateColumns={`150px repeat(7, 1fr)`} gap={1}>
//         <Box />
//         {daysOfWeek.map((day) => (
//           <Typography key={day} align="center" fontWeight="bold">
//             {day}
//           </Typography>
//         ))}

//         {staffList.map((staff) => (
//           <>
//             <Typography key={staff.id} fontWeight="bold">
//               {staff.name}
//             </Typography>
//             {daysOfWeek.map((day) => {
//               const shift = shifts.find(
//                 (s) => s.staffId === staff.id && s.day === day
//               );
//               return (
//                 <Paper
//                   key={`${staff.id}-${day}`}
//                   variant="outlined"
//                   sx={{
//                     height: 60,
//                     bgcolor: shift ? "#d0f0d0" : "#f4f4f4",
//                     p: 1,
//                     fontSize: "0.75rem",
//                     whiteSpace: "pre-wrap",
//                   }}
//                 >
//                   {shift ? `${shift.start} - ${shift.end}` : ""}
//                 </Paper>
//               );
//             })}
//           </>
//         ))}
//       </Box>

//       <Modal open={modalOpen} onClose={closeModal}>
//         <Box
//           sx={{
//             width: 400,
//             p: 4,
//             bgcolor: "white",
//             borderRadius: 2,
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6">Assign New Shift</Typography>

//           <TextField
//             select
//             label="Staff"
//             value={newShift.staffId}
//             onChange={(e) => handleChange("staffId", e.target.value)}
//             fullWidth
//           >
//             {staffList.map((s) => (
//               <MenuItem key={s.id} value={s.id}>
//                 {s.name}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             select
//             label="Day"
//             value={newShift.day}
//             onChange={(e) => handleChange("day", e.target.value)}
//             fullWidth
//           >
//             {daysOfWeek.map((day) => (
//               <MenuItem key={day} value={day}>
//                 {day}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TimePicker
//             label="Select Time"
//             value={newShift.start}
//             onChange={(newValue: any) => handleChange("start", newValue)}
//             slotProps={{
//               textField: {
//                 variant: "outlined",
//                 fullWidth: true,
//               },
//             }}
//           />
//           <TimePicker
//             label="End Time"
//             value={newShift.end}
//             onChange={(newValue: any) => handleChange("end", newValue)}
//             slotProps={{
//               textField: {
//                 variant: "outlined",
//                 fullWidth: true,
//               },
//             }}
//           />

//           <Button variant="contained" onClick={addShift}>
//             Save Shift
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default StaffRolesPage;
