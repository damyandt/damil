import { Box, Grid, MenuItem, Typography } from "@mui/material";
import TextField from "../../MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../../context/LanguageContext";
import {
  Column,
  Enum,
  EnumMap,
  Response,
  Row,
} from "../../../Global/Types/commonTypes";
import { useEffect, useState } from "react";
import Button from "../../MaterialUI/Button";
import callApi from "../../../API/callApi";
import {
  getQueryOptions,
  postSubscription,
} from "../../../pages/Access Control/API/getQueries";
import { useAuthedContext } from "../../../context/AuthContext";

interface NewSubscriptionPlanProps {
  rowData: Row;
  columns: Column[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshTable?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewSubscriptionPlan: React.FC<NewSubscriptionPlanProps> = ({
  rowData,
  setOpen,
  columns,
  setRefreshTable,
}) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const [options, setOptions] = useState<EnumMap>({});

  const handleChangSubscription = (field: string, value: string): void => {
    setSubscriptionData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  useEffect(() => {
    const fetchAllOptions = async () => {
      if (!columns) return;

      const optionsMap: EnumMap = {};

      for (const col of columns) {
        const isDropdown = col.dropDownConfig?.url;
        const isEnum = col.enumConfig?.url;

        if (isDropdown || isEnum) {
          const rawUrl = col.dropDownConfig?.url || col.enumConfig?.url;
          const url = rawUrl?.startsWith("/v1/") ? rawUrl.slice(4) : rawUrl;

          try {
            const options = await callApi<Response<Enum[]>>({
              query: getQueryOptions(url ?? ""),
              auth: { setAuthedUser },
            });
            options.success && (optionsMap[col.field] = options.data);
            !options.success &&
              console.error("Error fetching options for: ", col.field);
          } catch (error) {
            console.error("Error fetching options for", col.field, error);
          }
        }
      }

      setOptions(optionsMap);
    };

    fetchAllOptions();
  }, [columns]);
  return (
    <>
      <Grid container spacing={2} p={2}>
        <Grid size={12}>
          <Typography variant="h5" gutterBottom>
            {t("Update Subscription for")} {rowData.firstName}{" "}
            {rowData.lastName}
          </Typography>
        </Grid>

        <Grid size={6}>
          <TextField
            select
            label={t("Subcription Plan")}
            value={subscriptionData.subscriptionPlan}
            onChange={(e) =>
              handleChangSubscription("subscriptionPlan", e.target.value)
            }
            fullWidth
          >
            {!options["subscriptionPlan"] ? (
              <MenuItem value="loading">{t("Loading...")}</MenuItem>
            ) : (
              options["subscriptionPlan"].map(
                (option: { title: string; value: string | number }) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.title}
                  </MenuItem>
                )
              )
            )}
          </TextField>
        </Grid>
        <Grid size={6}>
          <TextField
            select
            label={t("Employment")}
            value={subscriptionData.subscriptionPlan}
            onChange={(e) =>
              handleChangSubscription("employment", e.target.value)
            }
            fullWidth
          >
            {!options["employment"] ? (
              <MenuItem value="loading">{t("Loading...")}</MenuItem>
            ) : (
              options["employment"].map(
                (option: { title: string; value: string | number }) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.title}
                  </MenuItem>
                )
              )
            )}
          </TextField>
        </Grid>
        {subscriptionData.subscriptionPlan === "VISIT_PASS" && (
          <Grid size={6}>
            <TextField
              select
              label={t("Visit Limit")}
              value={subscriptionData.visitLimit}
              type="number"
              onChange={(e) =>
                handleChangSubscription("visitLimit", e.target.value)
              }
              inputProps={{ min: 1 }}
              fullWidth
            >
              {[3, 6, 12, 24].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
      </Grid>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={() => setOpen(false)} color="error" variant="outlined">
          {t("Cancel")}
        </Button>
        <Button
          onClick={async () => {
            await callApi<Response<any>>({
              query: postSubscription(subscriptionData, rowData.id),
              auth: { setAuthedUser },
            });
            setOpen(false);
            setRefreshTable && setRefreshTable((prev: boolean) => !prev);
          }}
          color="primary"
          variant="contained"
        >
          {t("Confirm")}
        </Button>
      </Box>
    </>
  );
};

export default NewSubscriptionPlan;
