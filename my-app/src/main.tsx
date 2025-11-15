import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./context/ThemeContext";
import LanguageProvider from "./context/LanguageContext";
import AuthContext from "./context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import SnackboxContext from "./context/SnackbarContext";
import SnackbarPortal from "./components/pageComponents/SnackbarPortal";
// import { NavigationGuardProvider } from "./context/UnsavedChangesProvider";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <CssBaseline />
      <SnackboxContext>
        <AuthContext>
          <ThemeProvider>
            <LanguageProvider>
              <CssBaseline />
              <App />
              <SnackbarPortal />
            </LanguageProvider>
          </ThemeProvider>
        </AuthContext>
      </SnackboxContext>
    </LocalizationProvider>
  );
} else {
  console.error("Root element not found");
}
