import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import LanguageProvider from "./context/LanguageContext";
import { MAIN_COLOR } from "./Layout/layoutVariables";
import AuthContext from "./context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb"; // for UK date format dd/mm/yyyy

const theme = createTheme({
  palette: {
    primary: {
      main: MAIN_COLOR,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <ThemeProvider theme={theme}>
        <AuthContext>
          <LanguageProvider>
            <CssBaseline />
            <App />
          </LanguageProvider>
        </AuthContext>
      </ThemeProvider>
    </LocalizationProvider>
  );
} else {
  console.error("Root element not found");
}
