import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import theme from "../theme";
// import { PaletteMode } from "@mui/material";

type ThemeContextType = {
  themeColor: "light" | "dark";
  setThemeColor: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<"light" | "dark">("light");

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  const value: ThemeContextType = {
    themeColor,
    setThemeColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme(themeColor)}>{children}</MUIThemeProvider>
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
