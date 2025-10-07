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
import { useAuthedContext } from "./AuthContext";

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
  const { preferences } = useAuthedContext();
  const initialStoredMode: PaletteMode =
    preferences.mode === "light" || preferences.mode === "dark"
      ? preferences.mode
      : localStorage.getItem("themeMode") === "light" ||
        localStorage.getItem("themeMode") === "dark"
      ? (localStorage.getItem("themeMode") as PaletteMode)
      : "light";

  const [themeMode, setThemeMode] = useState<PaletteMode>(initialStoredMode);
  const initialStoredColor: string = preferences.themeColor
    ? preferences.themeColor
    : localStorage.getItem("themeColor")
    ? (localStorage.getItem("themeColor") as string)
    : "#a250fa";
  const [primaryColor, setPrimaryColor] = useState<string>(initialStoredColor);

  useEffect(() => {
    preferences.mode && setThemeMode(preferences.mode);
    preferences.mode && setPrimaryColor(preferences.themeColor);
    preferences.mode && localStorage.setItem("themeMode", preferences.mode);
    preferences.themeColor &&
      localStorage.setItem("themeColor", preferences.themeColor);
  }, [preferences]);

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
