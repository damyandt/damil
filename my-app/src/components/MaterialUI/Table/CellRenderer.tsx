import { Box, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import { ColumnType } from "../../../Global/Types/commonTypes";
import CustomTooltip from "../CustomTooltip";
import { useEffect, useRef, useState } from "react";

type CellRendererProps = {
  value: any;
  dataType: ColumnType;
  table: boolean;
  fontWeight?: number;
  ellipsis?: boolean;
  sx?: any;
};

const CellRenderer = ({
  value,
  dataType,
  table,
  fontWeight = 350,
  ellipsis = true,
  sx = {}, // default empty object
}: CellRendererProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  let displayValue: React.ReactNode = String(value);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    if (!ellipsis) {
      setIsOverflowed(false); // force no tooltip
      return;
    }

    if (textRef.current) {
      setIsOverflowed(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [value, ellipsis]);

  let style: React.CSSProperties = {
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

    case "phone":
      displayValue = (
        <a
          href={`tel:${value}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            transition: "color 0.2s, text-decoration 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1976d2"; // change color on hover
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "inherit"; // reset color
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          {value}
        </a>
      );
      break;

    case "number":
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
          component={"span"}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            border: `1px solid ${isDark ? "#90caf9" : "#1976d2"}`,
            backgroundColor: isDark ? "#1e3a5f" : "#e3f2fd",
            borderRadius: "10px",
            fontSize: "0.75rem",
            color: isDark ? "#90caf9" : "#1976d2",
            fontWeight: 700,
          }}
        >
          <EventIcon fontSize="small" />
          {formatted}
        </Box>
      );
      break;

    case "datetime": {
      const isISODate =
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}T/.test(value) &&
        dayjs(value).isValid();

      const formatted = isISODate
        ? dayjs(value).format("DD/MM/YYYY HH:mm")
        : dayjs(value).isValid()
        ? dayjs(value).format("DD/MM/YYYY HH:mm")
        : "Invalid DateTime";

      displayValue = (
        <Box
          component={"span"}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.5,
            border: `1px solid ${isDark ? "#81d4fa" : "#0288d1"}`,
            backgroundColor: isDark ? "#0d47a1" : "#e1f5fe",
            borderRadius: "10px",
            fontSize: "0.75rem",
            color: isDark ? "#81d4fa" : "#0288d1",
            fontWeight: 700,
          }}
        >
          <EventIcon fontSize="small" />
          {formatted}
        </Box>
      );
      break;
    }

    case "dropdown":
    case "enum": {
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
          color: isFemale
            ? isDark
              ? "#f48fb1" // lighter pink for dark mode
              : "#d81b60" // original pink
            : isDark
            ? "#90caf9" // lighter blue for dark mode
            : "#1976d2", // original blue

          backgroundColor: isFemale
            ? isDark
              ? "#3f2d3d" // muted dark pink background
              : "#fce4ec"
            : isDark
            ? "#1e3a5f" // muted dark blue background
            : "#e3f2fd",

          borderColor: isFemale
            ? isDark
              ? "#f48fb1"
              : "#d81b60"
            : isDark
            ? "#90caf9"
            : "#1976d2",
        };
        displayValue = (
          <Box
            component={"span"}
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
          color: isDark ? "#66bb6a" : "green",
          backgroundColor: isDark ? "#1b5e20" : "#e6ffe6",
          borderColor: isDark ? "#66bb6a" : "green",
          label: "Active",
        },
        inactive: {
          color: isDark ? "#ef5350" : "red",
          backgroundColor: isDark ? "#2a1b1b" : "#ffe6e6",
          borderColor: isDark ? "#ef5350" : "red",
          label: "Inactive",
        },
        pending: {
          color: isDark ? "#ffb74d" : "#ff9800",
          backgroundColor: isDark ? "#4e342e" : "#fff3e0",
          borderColor: isDark ? "#ffb74d" : "#ff9800",
          label: "Pending",
        },
        cancelled: {
          color: isDark ? "#bdbdbd" : "#9e9e9e",
          backgroundColor: isDark ? "#424242" : "#f5f5f5",
          borderColor: isDark ? "#bdbdbd" : "#9e9e9e",
          label: "Canceled",
        },
        low: {
          color: isDark ? "#81c784" : "#388e3c",
          backgroundColor: isDark ? "#1b5e20" : "#e8f5e9",
          borderColor: isDark ? "#81c784" : "#388e3c",
          label: "Low",
        },
        medium: {
          color: isDark ? "#ffb74d" : "#f57c00",
          backgroundColor: isDark ? "#4e342e" : "#fff3e0",
          borderColor: isDark ? "#ffb74d" : "#f57c00",
          label: "Medium",
        },
        high: {
          color: isDark ? "#ef9a9a" : "#c62828",
          backgroundColor: isDark ? "#3b1818" : "#ffebee",
          borderColor: isDark ? "#ef9a9a" : "#c62828",
          label: "High",
        },
      };

      const statusStyle = enumStyles[enumValue];
      if (statusStyle) {
        displayValue = (
          <Box
            component={"span"}
            sx={{
              display: "flex",
              gap: "0.5em",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              px: 1.5,
              py: 0.5,
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
              component={"span"}
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

  if (value === "N/A") {
    displayValue = (
      <Box display="flex" alignItems="center" gap={0.5}>
        <CloseIcon fontSize="small" color="error" />
      </Box>
    );
  }

  const textElement = (
    <Typography
      ref={textRef}
      fontWeight={fontWeight}
      border="none"
      display="block"
      sx={{
        ...sx,
        width: "100%",
        whiteSpace: ellipsis ? "nowrap" : "normal",
        overflow: ellipsis ? "hidden" : "visible",
        textOverflow: ellipsis ? "ellipsis" : "unset",
        wordBreak: ellipsis ? "keep-all" : "break-word",
      }}
    >
      {displayValue}
    </Typography>
  );

  return (
    <Box component="div" sx={{ ...style, width: "100%", height: "auto" }}>
      {ellipsis && isOverflowed ? (
        <CustomTooltip title={String(value)} arrow placement="top">
          {textElement}
        </CustomTooltip>
      ) : (
        textElement
      )}
    </Box>
  );
};

export default CellRenderer;
