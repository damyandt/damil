import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import LanguageProvider from "./context/LanguageContext";
import { MAIN_COLOR } from "./Layout/layoutVariables";
import AuthContext from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: MAIN_COLOR, // Apple's blue or any other primary color
    },
  },
  shape: {
    borderRadius: 12, // Optional: rounder component corners
  },
});

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider theme={theme}>
      <AuthContext>
        <LanguageProvider>
          <CssBaseline />
          <App />
        </LanguageProvider>
      </AuthContext>
    </ThemeProvider>
  );
} else {
  console.error("Root element not found");
}
