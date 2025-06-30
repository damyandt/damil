import { useState } from "react";
import { useAuthedContext } from "../../../context/AuthContext";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Grow, IconButton, Stack, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClientForm from "./ClientForm";
import CustomModal from "../../MaterialUI/Modal";

interface InvoiceRightMenuProps {
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientsRightMenu: React.FC<InvoiceRightMenuProps> = ({
  setRefreshTable,
}) => {
  // const { setAuthedUser } = useAuthedContext();
  const { t } = useLanguageContext();

  const [modalTitle, setModalTitle] = useState<any | null>(null);
  console.log(modalTitle);
  return (
    <>
      <Stack alignItems="center">
        <Stack alignItems="center">
          <Tooltip title={t("Add")}>
            <IconButton
              aria-label="add new widget"
              onClick={() => setModalTitle("Add new Client")}
            >
              <AddOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <CustomModal
        open={!!modalTitle}
        onClose={() => setModalTitle(null)}
        title="Add New Client"
        width={"lg"}
      >
        <Grow in={!!modalTitle} timeout={1000}>
          <div>
            <ClientForm onClose={() => setModalTitle(null)} />
          </div>
        </Grow>
      </CustomModal>
    </>
  );
};

export default ClientsRightMenu;
