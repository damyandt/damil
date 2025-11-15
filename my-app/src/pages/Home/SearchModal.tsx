import {
  Box,
  Grid,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  List,
  ClickAwayListener,
} from "@mui/material";
import CustomModal from "../../components/MaterialUI/Modal";
import TextField from "../../components/MaterialUI/FormFields/TextField";
import { useLanguageContext } from "../../context/LanguageContext";
import Button from "../../components/MaterialUI/Button";
import { useEffect, useRef, useState } from "react";
import { getMember } from "../Access Control/API/getQueries";
import callApi from "../../API/callApi";
import { useAuthedContext } from "../../context/AuthContext";
import Alert from "../../components/MaterialUI/Alert";
import CellRenderer from "../../components/MaterialUI/Table/CellRenderer";
import { Response } from "../../Global/Types/commonTypes";
import Checkbox from "../../components/MaterialUI/FormFields/Checkbox";
import { User } from "../usersPages/api/userTypes";

interface SearchModalProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<SearchModalProps> = ({
  openSearch,
  setOpenSearch,
}) => {
  const { t } = useLanguageContext();
  const { setAuthedUser } = useAuthedContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState("");
  const [usersFound, setUsersFound] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [t("Search Member"), t("View Details")];
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [searchType, setSearchType] = useState<
    "ID" | "Name" | "Email" | "Phone"
  >("ID");

  useEffect(() => {
    if (!searchInput.trim()) {
      setUsersFound(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const response: Response<Array<Partial<User>>> = await callApi<any>({
          query: getMember(searchInput, searchType.toLowerCase()),
          auth: { setAuthedUser },
        });

        if (response.data.length > 0) {
          setUsersFound(response.data);
        } else {
          setUsersFound([]);
        }
      } catch (err: any) {
        console.error(err);
        setUsersFound([]);
      }
    }, 500);
  }, [searchInput, searchType]);

  const handleNext = async () => {
    try {
      const userDetails: Response<Array<Partial<User>>> = await callApi<any>({
        query: getMember(searchInput, searchType.toLowerCase()),
        auth: { setAuthedUser },
      });

      if (userDetails.data.length > 0) {
        setUsersFound(userDetails.data);
        setErrors({});
      } else {
        setUsersFound([]);
        setErrors({
          search: t(`Can't find user with ${searchType} - ${searchInput}`),
        });
      }
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
            </Box>
          </Grid>

          <Grid size={12}>
            <Typography mb={2}>{t(`Enter Member ${searchType}`)}</Typography>
          </Grid>

          <Grid size={12} position="relative">
            <TextField
              fullWidth
              label={t("Search")}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setAnchorEl(e.currentTarget);
              }}
              onEnterFunc={handleNext}
            />

            <Popper
              open={!!usersFound && usersFound.length > 0}
              anchorEl={anchorEl}
              style={{ zIndex: 1300, width: anchorEl?.clientWidth }}
              placement="bottom-start"
            >
              <ClickAwayListener
                onClickAway={() => {
                  setUsersFound(null);
                }}
              >
                <Paper>
                  <List dense>
                    {usersFound?.map((user: any, idx: number) => (
                      <ListItemButton
                        key={idx}
                        onClick={() => {
                          setUserDetails([user]);
                          setActiveStep(1);
                          setUsersFound(null);
                        }}
                      >
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={`${user.email || ""} ${user.phone || ""}`}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </ClickAwayListener>
            </Popper>
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
              {t("Search")}
            </Button>
          </Grid>
        </Grid>
      )}

      {activeStep === 1 && (
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
                onClick={async () => {
                  setSearchInput("");
                  setUserDetails(null);
                  setActiveStep((prev: any) => (prev -= 1));
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
      )}
    </CustomModal>
  );
};

export default SearchModal;
