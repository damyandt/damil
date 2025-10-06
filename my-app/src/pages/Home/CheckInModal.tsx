import React, { useEffect, useState } from "react";
import { Box, Stepper, Step, StepLabel, Grid, Typography } from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal"; // Use your own modal component
import TextField from "../../components/MaterialUI/FormFields/TextField";
import Button from "../../components/MaterialUI/Button";
import callApi from "../../API/callApi";
import { checkInMember, getMember } from "../Access Control/API/getQueries";
import { useAuthedContext } from "../../context/AuthContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Alert from "../../components/MaterialUI/Alert";
import { useLanguageContext } from "../../context/LanguageContext";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
import { Partial } from "@react-spring/web";
import { User } from "../usersPages/userTypes";
import { Response } from "../../Global/Types/commonTypes";
import Checkbox from "../../components/MaterialUI/FormFields/Checkbox";
interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  userInfo?: Partial<User>;
}

const CheckInModal: React.FC<CheckInModalProps> = ({
  open,
  onClose,
  userInfo = null,
}) => {
  const { t } = useLanguageContext();
  const [searchType, setSearchType] = useState<
    "ID" | "Name" | "Email" | "Phone"
  >("ID");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState<string>("");
  const [usersFound, setUsersFound] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(userInfo || null);
  const { setAuthedUser } = useAuthedContext();
  const steps = [
    t("Search Member"),
    t("Confirm Details"),
    t("Check-In Complete"),
  ];

  useEffect(() => {
    userInfo && setActiveStep(1);
  }, [userInfo]);

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

  // const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = async () => {
    const checkIn = await callApi<any>({
      query: checkInMember(userDetails[0].id),
      auth: { setAuthedUser },
    });

    checkIn.success === true
      ? setActiveStep((prev) => prev + 1)
      : setErrors({ noVisits: checkIn.message });

    if (checkIn.success === true) {
      setSearchInput("");
      setUserDetails(null);
      setActiveStep(0);
      setErrors({});
    }
  };

  const handleReset = (closeModal: boolean) => {
    setSearchInput("");
    setUserDetails(null);
    setActiveStep(0);
    setErrors({});
    closeModal && onClose();
  };

  return (
    <CustomModal
      title={t("Member Check-In")}
      titleIcon="login"
      open={open}
      onClose={() => handleReset(true)}
      width="lg"
    >
      <Box sx={{ width: "100%", mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, idx) => (
            <Step key={idx}>
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
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
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
        (userDetails?.length > 1 ? (
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
                <Button variant="outlined" onClick={handleFinish}>
                  {t("Check In")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}

      {/* Step 3 */}
      {activeStep === 2 && (
        <>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            width={"100%"}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "success.main", mb: 2, width: "100%" }}
            />
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="success.main"
              width="100%"
              textAlign={"center"}
            >
              {t("Check-In Successful!")}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              width="100%"
              textAlign={"center"}
            >
              {userDetails?.firstName} {userDetails?.lastName}{" "}
              {t("has been checked in.")}
            </Typography>
          </Box>

          <Grid
            container
            spacing={2}
            mt={4}
            display="flex"
            justifyContent="flex-end"
          >
            <Grid>
              <Button onClick={() => handleReset(true)} color="error">
                {t("Close")}
              </Button>
            </Grid>
            <Grid>
              <Button onClick={() => handleReset(false)}>
                {t("Next Check-In")}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </CustomModal>
  );
};

export default CheckInModal;
