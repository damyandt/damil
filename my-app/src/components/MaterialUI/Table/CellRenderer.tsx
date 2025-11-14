import { Box, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import {
  ColumnType,
  employeeRoles,
  genders,
  statuses,
} from "../../../Global/Types/commonTypes";
import CustomTooltip from "../CustomTooltip";
import { useEffect, useRef, useState } from "react";
import { useLanguageContext } from "../../../context/LanguageContext";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { toSentenceCase } from "../../../Global/Utils/commonFunctions";
import {
  EnumIconsMap,
  useGenderStyles,
  useRoleStyles,
  useStatusStyles,
} from "../../../Global/Styles/cellStyles";
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
  const { t } = useLanguageContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  let displayValue: React.ReactNode = String(value);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const roleStyles: EnumIconsMap = useRoleStyles();
  const genderStyles: EnumIconsMap = useGenderStyles();

  const iconTagStyles: EnumIconsMap = { ...roleStyles, ...genderStyles };
  const statusStyles: EnumIconsMap = useStatusStyles();

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
      const normalizedValue = String(value).toLowerCase();

      const isIconTag =
        employeeRoles.includes(normalizedValue) ||
        genders.includes(normalizedValue);

      if (isIconTag) {
        const currentStyle = iconTagStyles[normalizedValue];

        if (currentStyle) {
          displayValue = (
            <Box
              component={"span"}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                border: `1px solid ${currentStyle.borderColor}`,
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: currentStyle.color,
                backgroundColor: currentStyle.backgroundColor,
              }}
            >
              {currentStyle.icon}
              {t(toSentenceCase(value))}
            </Box>
          );
        }
        break;
      }

      if (statuses.includes(normalizedValue)) {
        const statusStyle = statusStyles[normalizedValue];

        if (statusStyle) {
          displayValue = (
            <Box
              component={"span"}
              sx={{
                display: "flex",
                gap: "0.5em",
                width: "fit-content",
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
              {t(toSentenceCase(value))}
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
  if (value === null || value === undefined) {
    const nullColor = isDark
      ? theme.palette.grey[400]
      : theme.palette.grey[700];
    const nullBg = isDark ? theme.palette.grey[800] : theme.palette.grey[100];
    const nullBorder = isDark
      ? theme.palette.grey[600]
      : theme.palette.grey[400];

    displayValue = (
      <Box
        component={"span"}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          border: `1px solid ${nullBorder}`,
          backgroundColor: nullBg,
          borderRadius: "10px",
          fontSize: "0.75rem",
          color: nullColor,
          fontWeight: 600, // 700 might be too bold, 600 is a good medium
        }}
      >
        <DoNotDisturbIcon sx={{ fontSize: "0.875rem" }} />
        {t("None")}
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
