import { Alert as MUIAlert, AlertColor, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SerializedStyles } from "@emotion/react";
import { FormStatuses } from "../../Global/Types/commonTypes";
import Collapse from "./Collapse";

interface AlertProps {
  css?: SerializedStyles[] | SerializedStyles;
  className?: string;
  message: React.ReactNode;
  showAlert: boolean;
  severity?: FormStatuses;
  autoClose?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  message,
  showAlert,
  severity = "error",
  className,
  autoClose,
}) => {
  const [open, setOpen] = useState(false);

  let mySeverity = severity;

  if (severity === "loading" || !severity) {
    mySeverity = "info";
  }

  useEffect(() => {
    setOpen(showAlert);

    // Auto-close after 5 seconds
    if (autoClose && showAlert) {
      const timeoutId = setTimeout(() => {
        setOpen(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert, autoClose]);

  return (
    <Collapse in={open}>
      <MUIAlert
        className={className}
        severity={mySeverity as AlertColor}
        style={{ alignItems: "center" }}
      >
        <Typography variant="body1">{message}</Typography>
      </MUIAlert>
    </Collapse>
  );
};

export default Alert;
