import { useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Grow, IconButton, Stack, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClientForm from "./ClientForm";
import CustomModal from "../../MaterialUI/Modal";
import CustomTooltip from "../../MaterialUI/CustomTooltip";

interface InvoiceRightMenuProps {
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientsRightMenu: React.FC<InvoiceRightMenuProps> = ({
  setRefreshTable,
}) => {
  const { t } = useLanguageContext();

  const [modalTitle, setModalTitle] = useState<any | null>(null);
  return (
    <>
      <Stack alignItems="center">
        <Stack alignItems="center">
          <CustomTooltip title={t("Add")}>
            <IconButton
              aria-label="add new widget"
              onClick={() => setModalTitle("Add new Client")}
            >
              <AddOutlinedIcon />
            </IconButton>
          </CustomTooltip>
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
            <ClientForm
              onClose={() => setModalTitle(null)}
              setRefreshTable={setRefreshTable}
            />
          </div>
        </Grow>
      </CustomModal>
    </>
  );
};

export default ClientsRightMenu;
