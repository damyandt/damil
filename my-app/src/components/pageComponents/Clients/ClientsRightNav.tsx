import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import { IconButton, Stack } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import CustomModal from "../../MaterialUI/Modal";
import ClientsCreateForm from "./ClientsCreateForm";
import { Row } from "../../../Global/Types/commonTypes";

interface ClientsRightMenuProps {
  columns: any;
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
}

const ClientsRightMenu: React.FC<ClientsRightMenuProps> = ({
  columns,
  setRows,
}) => {
  const { t } = useLanguageContext();

  const [modalTitle, setModalTitle] = useState<any | null>(null);
  return (
    <>
      <Stack alignItems="center">
        <Stack alignItems="center">
          <CustomTooltip title={t("Add")}>
            <IconButton
              aria-label="Add new Client"
              onClick={() => setModalTitle("Add new Client")}
            >
              <AddOutlinedIcon />
            </IconButton>
          </CustomTooltip>
        </Stack>
      </Stack>

      <CustomModal
        open={!!modalTitle}
        onClose={() => {
          setModalTitle(null);
        }}
        title={t("Add New Client")}
        width={"lg"}
      >
        <ClientsCreateForm
          setFinalRows={setRows}
          columns={columns}
          setModalTitle={setModalTitle}
        />
      </CustomModal>
    </>
  );
};

export default ClientsRightMenu;
