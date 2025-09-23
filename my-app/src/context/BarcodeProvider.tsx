import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import { Response } from "../Global/Types/commonTypes";
import { User } from "../pages/usersPages/userTypes";
import callApi from "../API/callApi";
import { getMember } from "../pages/Access Control/API/getQueries";
import { useAuthedContext } from "./AuthContext";
import CheckInModal from "../pages/Home/CheckInModal";

const GlobalBarcodeScanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<any>(null);
  const { setAuthedUser } = useAuthedContext();
  const buffer = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (buffer.current.length > 0) {
          getUserInfo(buffer.current);
          setOpen(true);
          buffer.current = "";
        }
      } else {
        buffer.current += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getUserInfo = async (code: string) => {
    try {
      const userDetails: any = await callApi<any>({
        query: getMember(code, "qrToken"),
        auth: { setAuthedUser },
      });
      userDetails.success === true && setOpen(true);
      userDetails.success === true && setInfo(userDetails.data);
      console.log("Fetched user details:", userDetails.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  return (
    // <Dialog open={open} onClose={() => setOpen(false)}>
    //   <DialogTitle>Scanned Code</DialogTitle>
    //   <DialogContent>
    //     <Typography variant="h6">{scannedCode}</Typography>
    //     <Button
    //       onClick={() => setOpen(false)}
    //       variant="contained"
    //       sx={{ mt: 2 }}
    //     >
    //       Close
    //     </Button>
    //   </DialogContent>
    // </Dialog>

    info !== null && (
      <CheckInModal
        open={open}
        onClose={() => setOpen(false)}
        userInfo={info}
      />
    )
  );
};

export default GlobalBarcodeScanner;
