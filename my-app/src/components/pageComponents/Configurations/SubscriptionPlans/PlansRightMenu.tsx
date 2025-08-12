import { Box, IconButton, Stack } from "@mui/material";
import CustomTooltip from "../../../MaterialUI/CustomTooltip";
import CustomModal from "../../../MaterialUI/Modal";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddNewPlansPaper, { SubscriptionPlan } from "./AddNewPlanPaper";
import { Enum, Row } from "../../../../Global/Types/commonTypes";

interface PlansRightMenuProps {
  plansOptions: Enum[];
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  withoutThis: SubscriptionPlan[];
}

const PlansRightMenu: React.FC<PlansRightMenuProps> = ({
  plansOptions,
  setRefreshTable,
  withoutThis,
}) => {
  const { t } = useLanguageContext();

  const [modalTitle, setModalTitle] = useState<string | null>(null);
  return (
    <>
      <Stack alignItems="center">
        <Stack alignItems="center">
          <CustomTooltip title={t("Add")}>
            <IconButton
              aria-label="Add new Subscription Plan"
              onClick={() => setModalTitle(t("Add new Subscription Plan"))}
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
        width={"sm"}
        style="create"
        titleIcon="create"
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <AddNewPlansPaper
            withoutThis={withoutThis}
            plansOptions={plansOptions}
            setRefreshTable={setRefreshTable}
          />
        </Box>
      </CustomModal>
    </>
  );
};

export default PlansRightMenu;
