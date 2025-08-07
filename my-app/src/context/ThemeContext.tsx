import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  ThemeProvider as MUIThemeProvider,
  PaletteMode,
} from "@mui/material/styles";
import theme from "../theme";

type ThemeContextType = {
  themeMode: "light" | "dark";
  setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  primaryColor: string;
  setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>(
    (localStorage.getItem("themeMode") as PaletteMode) || "light"
  );

  const [primaryColor, setPrimaryColor] = useState<string>(
    localStorage.getItem("primaryColor") || "#a250fa"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  const value: ThemeContextType = {
    themeMode,
    setThemeMode,
    primaryColor,
    setPrimaryColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme(themeMode, primaryColor)}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useCustomThemeProviderContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useCustomThemeProviderContext must be used within a ThemeProvider"
    );
  }
  return context;
};

export default ThemeProvider;
