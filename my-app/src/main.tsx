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

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <CssBaseline />
      <AuthContext>
        <ThemeProvider>
          <LanguageProvider>
            <CssBaseline />
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </AuthContext>
    </LocalizationProvider>
  );
} else {
  console.error("Root element not found");
}
