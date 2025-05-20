import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from './context/ThemeContext';
import LanguageProvider from './context/LanguageContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider>
      <LanguageProvider>
        <CssBaseline />
        <App />
      </LanguageProvider>
    </ThemeProvider>
  );
} else {
  console.error("Root element not found");
}