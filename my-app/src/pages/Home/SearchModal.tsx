import { Box, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
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
import { Response } from "../../Global/Types/commonTypes";
import Checkbox from "../../components/MaterialUI/FormFields/Checkbox";
import { User } from "../usersPages/userTypes";

interface SearchModalProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<SearchModalProps> = ({
  openSearch,
  setOpenSearch,
}) => {
  const { setAuthedUser } = useAuthedContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { t } = useLanguageContext();
  const [searchInput, setSearchInput] = useState("");
  const [usersFound, setUsersFound] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [searchType, setSearchType] = useState<
    "ID" | "Name" | "Email" | "Phone"
  >("ID");
  const steps = [t("Search Member"), t("View Details")];

  const handleNext = async () => {
    try {
      const userDetails: Response<Array<Partial<User>>> = await callApi<any>({
        query: getMember(searchInput, searchType.toLowerCase()),
        auth: { setAuthedUser },
      });
      setUsersFound(userDetails.data);
      userDetails.data && setUserDetails(userDetails?.data);
      userDetails.success === true && setErrors({});
      userDetails.success === true &&
        userDetails.data.length !== 0 &&
        setActiveStep((prev) => prev + 1);
      userDetails.success === false &&
        setErrors({
          search: t(`Can't find user with ${searchType} - ${searchInput}`),
        });
      userDetails.data.length === 0 &&
        setErrors({
          search: t(`Can't find user with ${searchType} - ${searchInput}`),
        });
    } catch (error) {
      console.error(error);
      setErrors({ search: t("Can't find user with this information!") });
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setSearchInput("");
    setUserDetails(null);
    setOpenSearch(false);
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

      {/* Step 1 */}
      {activeStep === 0 && (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography>{t("Search By")}</Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              width={"70%"}
              margin={"0 auto"}
            >
              {[
                {
                  name: t("ID"),
                  value: "ID",
                },
                {
                  name: t("Name"),
                  value: "Name",
                },
                {
                  name: t("Email"),
                  value: "Email",
                },
                {
                  name: t("Phone"),
                  value: "Phone",
                },
              ].map((option) => (
                <Box
                  key={option.value}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={2}
                >
                  <Checkbox
                    checked={searchType === option.value}
                    onChange={() => setSearchType(option.value as any)}
                    sx={{ mt: 1 }}
                  />
                  <Typography variant="caption">{option.name}</Typography>
                </Box>
              ))}
              {/* </FormGroup> */}
              {/* </FormControl> */}
            </Box>
          </Grid>

          <Grid size={12}>
            <Typography mb={2}>{t(`Enter Member ${searchType}`)}</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label={t("Search")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // ✅ Prevent form submission or unwanted action
                  e.stopPropagation(); // ✅ Optional: block global handlers
                  handleNext();
                }
              }}
            />
          </Grid>

          <Grid size={12}>
            <Alert
              message={errors["search"]}
              showAlert={!!errors["search"]}
              severity="error"
            />
          </Grid>
          <Grid size={12} textAlign="right" mt={2}>
            <Button disabled={!searchInput.trim()} onClick={handleNext}>
              Next
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Step 2 */}
      {activeStep === 1 &&
        (userDetails.length > 1 ? (
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography mb={2}>{t("Select a member")}</Typography>
            </Grid>
            <Grid container spacing={2}>
              {usersFound?.map((user: any, idx: number) => (
                <Grid size={12} key={idx}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 1, textAlign: "left" }}
                    onClick={() => {
                      setUserDetails([user]);
                    }}
                  >
                    {user.firstName} {user.lastName} — {user.email} -{" "}
                    {user.phone}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid size={12} justifyContent={"flex-end"} display={"flex"}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setActiveStep((prev: number) => (prev -= 1));
                }}
              >
                {t("Back")}
              </Button>
            </Grid>
          </Grid>
        ) : (
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
                    value={`${userDetails?.[0].firstName} ${userDetails?.[0].lastName}`}
                    dataType={"string"}
                    table={false}
                  />
                </Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="subtitle2">{t("Email")}</Typography>

                <CellRenderer
                  key={t("Email")}
                  value={userDetails?.[0].email}
                  dataType={"string"}
                  table={false}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="subtitle2">{t("Phone")}</Typography>
                <CellRenderer
                  key={t("Phone")}
                  value={userDetails?.[0].phone || "-"}
                  dataType={"string"}
                  table={false}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="subtitle2">{t("Gender")}</Typography>
                <CellRenderer
                  key={t("Gender")}
                  value={userDetails?.[0].gender}
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
                  value={userDetails?.[0].subscriptionPlan}
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
                  value={userDetails?.[0].subscriptionStatus}
                  dataType={"enum"}
                  table={false}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="subtitle2">{t("Start Date")}</Typography>
                <CellRenderer
                  key={t("Start Date")}
                  value={userDetails?.[0].subscriptionStartDate}
                  dataType={"date"}
                  table={false}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="subtitle2">{t("End Date")}</Typography>
                <CellRenderer
                  key={t("Start Date")}
                  value={userDetails?.[0].subscriptionEndDate}
                  dataType={"date"}
                  table={false}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={3} justifyContent="flex-end">
              <Grid>
                <Button
                  variant="outlined"
                  onClick={() => {
                    usersFound.length > 1
                      ? setUserDetails(usersFound)
                      : setActiveStep((prev: any) => (prev -= 1));
                  }}
                  color="error"
                >
                  {t("Back")}
                </Button>
              </Grid>
              <Grid>
                <Button variant="outlined" onClick={() => setOpenSearch(false)}>
                  {t("Check In")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
    </CustomModal>
  );
};

export default SearchModal;
