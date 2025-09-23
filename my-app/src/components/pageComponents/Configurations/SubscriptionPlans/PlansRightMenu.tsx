import { Box, IconButton, Stack } from "@mui/material";
import CustomTooltip from "../../../MaterialUI/CustomTooltip";
import CustomModal from "../../../MaterialUI/Modal";
import { useLanguageContext } from "../../../../context/LanguageContext";
import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddNewPlansPaper, { SubscriptionPlan } from "./AddNewPlanPaper";
import { Enum, Response, Row } from "../../../../Global/Types/commonTypes";
import DefinePricesForm from "../../../../pages/Configurations/DefinePricesSubPlans";
import callApi from "../../../../API/callApi";
import { postPlans } from "../../../../pages/Configurations/API/getQueries";
import { useAuthedContext } from "../../../../context/AuthContext";

interface PlansRightMenuProps {
  plansOptions: Enum[];
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  withoutThis: Enum[];
}

const PlansRightMenu: React.FC<PlansRightMenuProps> = ({
  plansOptions,
  setRefreshTable,
  withoutThis,
}) => {
  const { setAuthedUser } = useAuthedContext();
  const { t } = useLanguageContext();
  const [step, setStep] = useState<number>(1);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
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
        title="Add New Subscription Plan"
        width={step === 2 ? "lg" : "md"}
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
          {step === 1 ? (
            <AddNewPlansPaper
              withoutThis={withoutThis}
              plansOptions={plansOptions}
              onNext={(plans: string[]) => {
                setSelectedPlans(plans);

                setStep(2);
              }}
            />
          ) : (
            <DefinePricesForm
              inModal={true}
              plans={selectedPlans}
              onBack={() => setStep(1)}
              onSubmit={async (plansWithPrices: any) => {
                try {
                  await callApi<Response<any>>({
                    query: postPlans(plansWithPrices),
                    auth: { setAuthedUser },
                  });
                  setModalTitle(null);
                  setRefreshTable((prev) => !prev);
                  setStep(1);
                } catch (err) {
                  console.error(err);
                }
              }}
            />
          )}
        </Box>
      </CustomModal>
    </>
  );
};

export default PlansRightMenu;
