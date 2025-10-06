import { useState } from "react";
import { IconButton, Stack, Box, Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { Dayjs } from "dayjs";
import { useLanguageContext } from "../../../context/LanguageContext";
import DatePickerComponent from "../../MaterialUI/FormFields/DatePicker";
import CustomTooltip from "../../MaterialUI/CustomTooltip";
import Button from "../../MaterialUI/Button";

interface VisitorsRightMenuProps {
  startDate: Dayjs;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  endDate: Dayjs;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
}

const VisitorsRightMenu: React.FC<VisitorsRightMenuProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setRefreshTable,
}) => {
  const { t } = useLanguageContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(
    null
  );

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>,
    picker: "start" | "end"
  ) => {
    setAnchorEl(event.currentTarget);
    setActivePicker(picker);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActivePicker(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack alignItems="center" spacing={2} mt={10}>
      <CustomTooltip
        title={`${t("Start Date")}: ${startDate.format("DD/MM/YYYY")}`}
      >
        <IconButton onClick={(e) => handleOpen(e, "start")}>
          <CalendarMonthIcon />
        </IconButton>
      </CustomTooltip>
      <CustomTooltip
        title={`${t("End Date")}: ${endDate.format("DD/MM/YYYY")}`}
      >
        <IconButton onClick={(e) => handleOpen(e, "end")}>
          <EventBusyIcon />
        </IconButton>
      </CustomTooltip>
      {/* <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          p: 20,
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            alignItems: "flex-end",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          {activePicker === "start" && (
            <DatePickerComponent
              label={t("Start Date")}
              value={startDate}
              onChange={(newValue: Dayjs | null) => {
                newValue && setStartDate(newValue.startOf("day"));
                setAnchorEl(null);
                setRefreshTable((prev: boolean) => !prev);
              }}
            />
          )}
          {activePicker === "end" && (
            <DatePickerComponent
              label={t("End Date")}
              value={endDate}
              onChange={(newValue: Dayjs | null) => {
                newValue && setEndDate(newValue.startOf("day"));
                setAnchorEl(null);
                setRefreshTable((prev: boolean) => !prev);
              }}
            />
          )}
        </Box>
      </Popover> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
            width: 250, // Adjust width if needed
          }}
        >
          {activePicker && (
            <>
              <DatePickerComponent
                label={
                  activePicker === "start" ? t("Start Date") : t("End Date")
                }
                value={activePicker === "start" ? startDate : endDate}
                onChange={(newValue: Dayjs | null) => {
                  if (newValue) {
                    if (activePicker === "start") {
                      setStartDate(newValue.startOf("day"));
                    } else {
                      setEndDate(newValue.startOf("day"));
                    }
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setRefreshTable((prev) => !prev);
                  handleClose();
                }}
                fullWidth
              >
                {t("Apply")}
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </Stack>
  );
};

export default VisitorsRightMenu;
