import {
  Box,
  Chip,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../context/LanguageContext";
import Button from "../../components/MaterialUI/Button";
import { useState } from "react";
import { getMember } from "../Access Control/API/getQueries";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import Alert from "../../components/MaterialUI/Alert";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";

interface SearchModalProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<SearchModalProps> = ({
  openSearch,
  setOpenSearch,
}) => {
  const { setAuthedUser, authedUser } = useAuthedContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { t } = useLanguageContext();
  const [searchInput, setSearchInput] = useState("");

  const [userDetails, setUserDetails] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [t("Search Member"), t("View Details")];

  const handleNext = async () => {
    try {
      const userDetails = await callApi<any>({
        query: getMember(authedUser?.id || "", searchInput),
        auth: { setAuthedUser },
      });
      if (activeStep === 0) {
        setUserDetails(userDetails.data);
      }
      userDetails.success === true && setErrors({});
      userDetails.success === true && setActiveStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      setErrors({ search: "Can't find user with this information!" });
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setSearchInput("");
    setUserDetails(null);
    setOpenSearch(false);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <CustomModal
      title={t("Search User")}
      open={openSearch}
      onClose={handleClose}
      width={"lg"}
      titleIcon="search"
    >
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step Content */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="subtitle1" mb={2}>
            {t("Enter Member ID or Name")}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label={t("Search")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
              />
            </Grid>
            <Grid size={12} display="flex" justifyContent="flex-end">
              <Button onClick={handleNext} disabled={!searchInput.trim()}>
                {t("Next")}
              </Button>
            </Grid>
            <Grid size={12}>
              <Alert
                message={errors["search"]}
                showAlert={!!errors["search"]}
                severity="error"
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {activeStep === 1 && userDetails && (
        <Box>
          <Typography variant="h6" mb={2}>
            {t("Member Details")}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Name")}</Typography>
              <Typography>
                <CellRenderer
                  key={t("Name")}
                  value={`${userDetails.firstName} ${userDetails.lastName}`}
                  dataType={"string"}
                  table={false}
                />
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Email")}</Typography>

              <CellRenderer
                key={t("Email")}
                value={userDetails.email}
                dataType={"string"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Phone")}</Typography>
              <CellRenderer
                key={t("Phone")}
                value={userDetails.phone || "-"}
                dataType={"string"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Gender")}</Typography>
              <CellRenderer
                key={t("Gender")}
                value={userDetails.gender}
                dataType={"enum"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">
                {t("Subscription Plan")}
              </Typography>

              <CellRenderer
                key={t("Subscription Plan")}
                value={userDetails.subscriptionPlan}
                dataType={"enum"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">
                {t("Subscription Status")}
              </Typography>
              <CellRenderer
                key={t("Subscription Status")}
                value={userDetails.subscriptionStatus}
                dataType={"enum"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("Start Date")}</Typography>
              <CellRenderer
                key={t("Start Date")}
                value={userDetails.subscriptionStartDate}
                dataType={"date"}
                table={false}
              />
            </Grid>
            <Grid size={4}>
              <Typography variant="subtitle2">{t("End Date")}</Typography>
              <CellRenderer
                key={t("Start Date")}
                value={userDetails.subscriptionEndDate}
                dataType={"date"}
                table={false}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={3} justifyContent="space-between">
            <Grid>
              <Button variant="outlined" onClick={handleBack}>
                {t("Back")}
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" onClick={handleClose}>
                {t("Close")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </CustomModal>
  );
};

export default SearchModal;
