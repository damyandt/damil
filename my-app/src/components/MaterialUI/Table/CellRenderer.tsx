import { Box, TableCell, Typography } from "@mui/material";
import dayjs from "dayjs";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import { ColumnType } from "../../../Global/Types/commonTypes";

type CellRendererProps = {
  value: any;
  dataType: ColumnType;
  table: boolean;
  fontWeight?: number;
};

const CellRenderer = ({
  value,
  dataType,
  table,
  fontWeight = 200,
}: CellRendererProps) => {
  let displayValue: React.ReactNode = String(value);
  let style: any = {
    margin: 0,
    border: "none",
    height: "fit-content",
    padding: table ? "0 0 0 1em" : 0,
    borderBottom: "none",
  };

  switch (dataType) {
    case "boolean":
      style.color = value ? "green" : "red";
      displayValue = value ? "True" : "False";
      break;

    case "number":
      if (value === "N/A") {
        displayValue = (
          <Box display="flex" alignItems="center" gap={0.5}>
            <CloseIcon fontSize="small" color="error" />
          </Box>
        );
      }
      style.color = "#1976d2";
      break;

    case "date":
      const isISODate =
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}T/.test(value) &&
        dayjs(value).isValid();

      const formatted = isISODate
        ? dayjs(value).format("DD/MM/YYYY")
        : dayjs(value).isValid()
          ? dayjs(value).format("DD/MM/YYYY")
          : "Invalid Date";

      displayValue = (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            border: "1px solid #1976d2",
            backgroundColor: "#e3f2fd",
            borderRadius: "10px",
            fontSize: "0.75rem",
            color: "#1976d2",
            fontWeight: 700,
          }}
        >
          <EventIcon fontSize="small" />
          {formatted}
        </Box>
      );
      break;

    case "dropdown":
    case "enum": {
      if (value === "N/A") {
        displayValue = (
          <Box display="flex" alignItems="center" gap={0.5}>
            <CloseIcon fontSize="small" color="error" />
          </Box>
        );
      }
      if (
        String(value).toLowerCase() === "female" ||
        String(value).toLowerCase() === "male"
      ) {
        const isFemale = value.toLowerCase() === "female";

        const genderStyles = {
          icon: isFemale ? (
            <FemaleIcon fontSize="small" />
          ) : (
            <MaleIcon fontSize="small" />
          ),
          color: isFemale ? "#d81b60" : "#1976d2", // pink vs blue
          backgroundColor: isFemale ? "#fce4ec" : "#e3f2fd",
          borderColor: isFemale ? "#d81b60" : "#1976d2",
        };
        displayValue = (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              border: `1px solid ${genderStyles.borderColor}`,
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: genderStyles.color,
              backgroundColor: genderStyles.backgroundColor,
              textTransform: "capitalize",
            }}
          >
            {genderStyles.icon}
            {value}
          </Box>
        );

        break;
      }

      const enumValue = String(value).toLowerCase();
      const enumStyles: Record<
        string,
        {
          color: string;
          backgroundColor: string;
          borderColor: string;
          label: string;
        }
      > = {
        active: {
          color: "green",
          backgroundColor: "#e6ffe6",
          borderColor: "green",
          label: "Active",
        },
        inactive: {
          color: "red",
          backgroundColor: "#ffe6e6",
          borderColor: "red",
          label: "Inactive",
        },
        pending: {
          color: "#ff9800",
          backgroundColor: "#fff3e0",
          borderColor: "#ff9800",
          label: "Pending",
        },
        cancelled: {
          color: "#9e9e9e",
          backgroundColor: "#f5f5f5",
          borderColor: "#9e9e9e",
          label: "Canceled",
        },
      };

      const statusStyle = enumStyles[enumValue];
      if (statusStyle) {
        displayValue = (
          <Box
            sx={{
              display: "flex",
              gap: "0.5em",
              width: "fit-content",
              alignItems: "center",
              padding: "0.5em 1em",
              border: "1px solid",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: statusStyle.color,
              borderColor: statusStyle.borderColor,
              backgroundColor: statusStyle.backgroundColor,
              textTransform: "capitalize",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: statusStyle.color,
              }}
            />
            {statusStyle.label}
          </Box>
        );
        style = {
          margin: 0,
          border: "none",
          height: "fit-content",
          padding: table ? "0 0 0 1em" : 0,
          borderBottom: "none",
        };
      }
      break;
    }

    case "custom":
      style = {
        fontStyle: "italic",
        color: "#999",
      };
      break;

    default:
      break;
  }

  return (
    <Box component="div" sx={style}>
      <Typography fontWeight={fontWeight}>{displayValue}</Typography>
    </Box>
  );
};

export default CellRenderer;
