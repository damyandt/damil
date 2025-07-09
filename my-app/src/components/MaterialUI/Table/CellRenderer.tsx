import { TableCell } from "@mui/material";

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
  let displayValue = String(value);
  let style: any = {};

  switch (dataType) {
    case "boolean":
      style.color = value ? "green" : "red";
      displayValue = value ? "True" : "False";
      break;

    case "number":
      style.color = "#1976d2"; // Blue
      break;

    case "string":
      if (displayValue.toLowerCase() === "active") {
        style.color = "green";
        style.fontWeight = 600;
      } else if (displayValue.toLowerCase() === "inactive") {
        style.color = "red";
        style.fontWeight = 600;
      }
      break;

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
