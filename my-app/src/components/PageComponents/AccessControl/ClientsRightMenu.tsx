import { useState } from "react";
import { useAuthedContext } from "../../../context/AuthContext";
import { useLanguageContext } from "../../../context/LanguageContext";
import { IconButton, Stack, Tooltip } from "@mui/material";
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
        title="Add new Client"
        // maxWidth={modalTitle === "Create new Invoice" ? "lg" : "sm"}
      >
        <ClientForm />
      </CustomModal>
    </>
  );
};

export default ClientsRightMenu;
