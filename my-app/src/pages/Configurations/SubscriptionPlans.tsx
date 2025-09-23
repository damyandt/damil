import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import TableComponent from "../../components/MaterialUI/Table/Table";
import { useEffect, useState } from "react";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import {
  Enum,
  FormStatuses,
  Response,
  Table,
} from "../../Global/Types/commonTypes";
import { useLanguageContext } from "../../context/LanguageContext";
import {
  getCurrentSubscriptionPlans,
  getSubscriptionPlans,
  getSubscriptionPlansTable,
  postPlans,
} from "./API/getQueries";
import { AppRouterProps } from "../../Layout/layoutVariables";
import { useOutletContext } from "react-router-dom";
import PlansRightMenu from "../../components/pageComponents/Configurations/SubscriptionPlans/PlansRightMenu";
import AddNewPlansPaper from "../../components/pageComponents/Configurations/SubscriptionPlans/AddNewPlanPaper";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import DefinePricesForm from "./DefinePricesSubPlans";

const SubscriptionPlans = () => {
  const { t } = useLanguageContext();
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Table>();
  const [plansOptions, setPlansOptions] = useState<Enum[]>([]);
  const [currentPlans, setCurrentPlans] = useState<Enum[]>([]);
  const [pageStatus, setPageStatus] = useState<FormStatuses>("loading");
  const [step, setStep] = useState<number>(1);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);

  const { smMediaQuery, setExtraRightNavMenu } =
    useOutletContext<AppRouterProps>();
  const { setAuthedUser } = useAuthedContext();

  useEffect(() => {
    setPageStatus("loading");
    fetchData();
  }, [refreshTable]);

  useEffect(() => {
    if (smMediaQuery) {
      setExtraRightNavMenu(null);
    } else {
      plansOptions.length !== currentPlans.length
        ? setExtraRightNavMenu(
            <PlansRightMenu
              plansOptions={plansOptions}
              setRefreshTable={setRefreshTable}
              withoutThis={currentPlans || []}
            />
          )
        : setExtraRightNavMenu(null);
    }

    return () => {
      setExtraRightNavMenu(null);
    };
  }, [smMediaQuery, tableData, plansOptions, currentPlans]);

  const fetchData = async () => {
    try {
      const data = await callApi<Response<Table>>({
        query: getSubscriptionPlansTable(),
        auth: { setAuthedUser },
      });
      setTableData(data.data);

      const plansRes = await callApi<Response<Enum[]>>({
        query: getSubscriptionPlans(),
        auth: { setAuthedUser },
      });
      setPlansOptions(plansRes.data);

      const currentPlansRes = await callApi<Response<Enum[]>>({
        query: getCurrentSubscriptionPlans(),
        auth: { setAuthedUser },
      });
      setCurrentPlans(currentPlansRes.data);
    } catch (err) {
      console.log(err);
    }

    setPageStatus(null);
  };

  return (
    <>
      {pageStatus === "loading" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "-webkit-fill-available",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : tableData?.rows.length !== 0 ? (
        <Box>
          <TableComponent
            configurations={tableData?.config}
            columns={tableData?.columns || []}
            rows={tableData?.rows || []}
            setRefreshTable={setRefreshTable}
            title={t("Subscription Plans")}
          />
        </Box>
      ) : (
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
          }}
        >
          <Card
            sx={{
              maxWidth: step === 1 ? 500 : 2000,
              width: "100%",
              boxShadow: 4,
            }}
          >
            <CardHeader
              avatar={<AssignmentTurnedIn color="primary" />}
              title={
                <Typography variant="h5">
                  {t("Finish setting up your plans")}
                </Typography>
              }
              subheader={t("Choose your starting plans to begin")}
            />
            <Divider />
            <CardContent>
              {step === 1 ? (
                <AddNewPlansPaper
                  plansOptions={plansOptions}
                  onNext={(plans: string[]) => {
                    setSelectedPlans(plans);
                    setStep(2);
                  }}
                />
              ) : (
                <DefinePricesForm
                  plans={selectedPlans}
                  onBack={() => setStep(1)}
                  onSubmit={async (plansWithPrices: any) => {
                    try {
                      await callApi<Response<any>>({
                        query: postPlans(plansWithPrices),
                        auth: { setAuthedUser },
                      });
                      setRefreshTable((prev) => !prev);
                      setStep(1);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default SubscriptionPlans;
