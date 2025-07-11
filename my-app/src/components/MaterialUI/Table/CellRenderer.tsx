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

    case "string": {
      if (
        String(displayValue).toLowerCase() === "active" ||
        String(displayValue).toLowerCase() === "inactive"
      ) {
        const isActive = String(displayValue).toLowerCase() === "active";
        console.log;
        displayValue = (
          <Box
            sx={{
              display: "inline-block",
              padding: "0.5em 1em",
              border: "1px solid",
              borderRadius: "20px",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: isActive ? "green" : "red",
              borderColor: isActive ? "green" : "red",
              backgroundColor: isActive ? "#e6ffe6" : "#ffe6e6",
              textTransform: "capitalize",
            }}
          >
            {isActive ? "Active" : "Inactive"}
          </Box>
        );
        // Clear TableCell style for this case
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
