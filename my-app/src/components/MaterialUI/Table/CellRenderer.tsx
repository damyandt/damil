import { Box, TableCell } from "@mui/material";

type CellRendererProps = {
  value: any;
  dataType: "string" | "number" | "boolean" | "date" | "custom" | string;
  align?: "left" | "right" | "center";
};

const CellRenderer = ({
  value,
  dataType,
  align = "left",
}: CellRendererProps) => {
  let displayValue: React.ReactNode = String(value);
  let style: any = {};
  switch (dataType) {
    case "boolean":
      style.color = value ? "green" : "red";
      displayValue = value ? "True" : "False";
      break;

    case "number":
      style.color = "#1976d2"; // Blue
      break;

    case "enum": {
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
              display: "inline-block",
              padding: "0.5em 1em",
              border: "1px solid",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: statusStyle.color,
              borderColor: statusStyle.borderColor,
              backgroundColor: statusStyle.backgroundColor,
              textTransform: "capitalize",
            }}
          >
            {statusStyle.label}
          </Box>
        );
        style = {};
      }

      break;
    }

    case "date":
      try {
        displayValue = new Date(value).toLocaleDateString();
        style.color = "#555";
      } catch {
        displayValue = "Invalid Date";
      }
      break;

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
    <TableCell align={align} sx={style}>
      {displayValue}
    </TableCell>
  );
};

export default CellRenderer;
