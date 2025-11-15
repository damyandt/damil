import { IconButton } from "@mui/material";
import CustomTooltip from "../../CustomTooltip";
import CustomModal from "../../Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { Column, Row } from "../../../../Global/Types/commonTypes";
import { useLanguageContext } from "../../../../context/LanguageContext";

type CustomActionProps = {
  columns: Column[];
  rowData?: any;
  icon: React.ReactNode;
  tooltip?: string;
  modalTitle: string;
  modalWidth?: "sm" | "md" | "lg";
  modalStyle?: "info" | "edit" | "create";
  modalTitleIcon?: "info" | "edit" | "create" | "search" | "login";
  renderContent?: (
    rowData?: Row,
    setOpen?: Dispatch<SetStateAction<boolean>>,
    setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>,
    setFinalRows?: React.Dispatch<React.SetStateAction<Row[]>>
  ) => React.ReactNode;
  setAnchorEl?: (value: any) => void;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
  setFinalRows: React.Dispatch<React.SetStateAction<Row[]>>;
};

export const CustomAction = ({
  rowData,
  icon,
  tooltip,
  modalTitle,
  modalWidth = "lg",
  renderContent,
  setAnchorEl,
  setRefreshTable,
  setFinalRows,
}: CustomActionProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useLanguageContext();
  return (
    <>
      <CustomTooltip title={t(tooltip || "")} placement="bottom">
        <IconButton
          onClick={() => {
            setOpen(true);
            setAnchorEl?.("closeOnlyAnchor");
          }}
        >
          {icon}
        </IconButton>
      </CustomTooltip>

      <CustomModal
        open={open}
        onClose={() => {
          setOpen(false);
          setAnchorEl?.(null);
        }}
        title={t(modalTitle)}
        width={t(modalWidth)}
      >
        {renderContent?.(rowData, setOpen, setRefreshTable, setFinalRows)}
      </CustomModal>
    </>
  );
};

export default CustomAction;

//example
// const clientCustomActions = [
//   {
//     id: "viewNotes",
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
//   {
//     id: "assignTrainer",
//     icon: <InfoIcon />,
//     tooltip: "Assign Trainer",
//     modalTitle: "Assign Trainer",
//     modalWidth: "sm" as const,
//     modalStyle: "create" as const,
//     modalTitleIcon: "create" as const,
//     renderContent: (rowData: any) => (
//       <div>
//         <p>
//           Assign a trainer to {rowData?.firstName} {rowData?.lastName}
//         </p>
//         {/* Put your form component here */}
//       </div>
//     ),
//   },
// ];
