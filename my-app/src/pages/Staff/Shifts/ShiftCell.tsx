import { useState } from "react";
import { Paper, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MAIN_COLOR } from "../../../Layout/layoutVariables";

const ShiftCell = ({ staff, day, shift, onDelete }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 50,
        borderColor: "#fff",
        bgcolor: () =>
          shift ? (hovered ? MAIN_COLOR + "20" : "#d0f0d0") : "#f0f2f5",
        p: 1,
        fontSize: "0.75rem",
        whiteSpace: "pre-wrap",
        alignContent: "center",
        textAlign: "center",
        cursor: shift ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
        position: "relative", // needed for absolute positioning children
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shift text */}
      <Box
        component="div"
        sx={{
          position: "absolute",
          transition: "opacity 0.3s ease",
          opacity: hovered ? 0 : 1,
          pointerEvents: hovered ? "none" : "auto",
        }}
      >
        {shift && shift.start && shift.end
          ? `${shift.start.format("HH:mm")} - ${shift.end.format("HH:mm")}`
          : ""}
      </Box>
      <Box sx={{ display: "flex" }}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(staff.id, day);
          }}
          sx={{
            // position: "absolute",
            transition: "opacity 0.3s ease",
            opacity: hovered && shift ? 1 : 0,
            pointerEvents: hovered && shift ? "auto" : "none",
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            console.log("edit");
          }}
          sx={{
            // position: "absolute",
            transition: "opacity 0.3s ease",
            opacity: hovered && shift ? 1 : 0,
            pointerEvents: hovered && shift ? "auto" : "none",
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ShiftCell;
