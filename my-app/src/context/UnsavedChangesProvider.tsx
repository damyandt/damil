import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/MaterialUI/Button";
import CustomModal from "../components/MaterialUI/Modal";
import { useLanguageContext } from "./LanguageContext";

// Define a type for the callback function that runs on confirmation
type PendingActionCallback = () => void;

type GuardContextType = {
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
  requestNavigation: (path: string) => void;
  requestActionConfirmation: (callback: PendingActionCallback) => boolean;
};

const NavigationGuardContext = createContext<GuardContextType | null>(null);

export const useNavigationGuard = () => {
  const ctx = useContext(NavigationGuardContext);
  if (!ctx) throw new Error("NavigationGuardContext not found");
  return ctx;
};

export const NavigationGuardProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // State for Navigation Guarding
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // ✅ New State for Action Guarding (Tab Change, etc.)
  const [pendingAction, setPendingAction] =
    useState<PendingActionCallback | null>(null);

  // Handler for external links
  const requestNavigation = useCallback(
    (path: string) => {
      if (hasUnsavedChanges) {
        setPendingPath(path);
        setPendingAction(null); // Clear any pending action
        setDialogOpen(true);
      } else {
        navigate(path);
      }
    },
    [hasUnsavedChanges, navigate]
  );

  // ✅ New Handler for internal actions (like tab change)
  const requestActionConfirmation = useCallback(
    (callback: PendingActionCallback): boolean => {
      if (hasUnsavedChanges) {
        setPendingAction(() => callback); // Store the function to be called later
        setPendingPath(null); // Clear any pending path
        setDialogOpen(true);
        return false; // Action is blocked
      }
      return true; // Action is allowed
    },
    [hasUnsavedChanges]
  );

  const confirmNavigation = () => {
    setDialogOpen(false);

    if (pendingPath) {
      setHasUnsavedChanges(false);
      navigate(pendingPath);
    } else if (pendingAction) {
      setHasUnsavedChanges(false);
      pendingAction();
    }

    // Clear state
    setPendingPath(null);
    setPendingAction(null);
  };

  return (
    <NavigationGuardContext.Provider
      value={{
        hasUnsavedChanges,
        setHasUnsavedChanges,
        requestNavigation,
        requestActionConfirmation,
      }}
    >
      {children}
      <CustomModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={t("Unsaved Changes")}
        width={"md"}
      >
        <Typography>
          {t(
            "You have unsaved changes. If you leave this page, your changes will be lost."
          )}
        </Typography>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => setDialogOpen(false)}>{t("Cancel")}</Button>
          <Button onClick={confirmNavigation} color="error">
            {t("Leave")}
          </Button>
        </Stack>
      </CustomModal>
    </NavigationGuardContext.Provider>
  );
};
