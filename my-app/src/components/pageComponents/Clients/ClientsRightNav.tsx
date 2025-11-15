import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import { IconButton, Stack } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import CustomModal from "../../MaterialUI/Modal";
import ClientsCreateForm from "./ClientsCreateForm";

interface ClientsRightMenuProps {
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  columns: any;
}

const ClientsRightMenu: React.FC<ClientsRightMenuProps> = ({
  setRefreshTable,
  columns,
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
          setRefreshTable((prev: boolean) => !prev);
        }}
        title={t("Add New Client")}
        width={"lg"}
      >
        <ClientsCreateForm
          setRefreshTable={setRefreshTable}
          columns={columns}
          setModalTitle={setModalTitle}
        />
      </CustomModal>
    </>
  );
};

export default ClientsRightMenu;
