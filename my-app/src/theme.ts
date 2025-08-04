import { PaletteMode } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { lighten, darken, alpha } from "@mui/system";

declare module "@mui/material/styles" {
  interface PaletteColor {
    light100?: string;
    light200?: string;
    light300?: string;
    light400?: string;
    dark100?: string;
    dark200?: string;
    dark300?: string;
    dark400?: string;
    opacityMain?: string;
  }

  interface SimplePaletteColorOptions {
    light100?: string;
    light200?: string;
    light300?: string;
    light400?: string;
    dark100?: string;
    dark200?: string;
    dark300?: string;
    dark400?: string;
    opacityMain?: string;
  }

  interface PaletteOptions {
    customColors?: {
      greyText?: string;
      darkGrey?: string;
      darkBackgroundColor?: string;
      darkGray?: string;
      themeBackground?: string;
      sectionBackgroundColor: string;
      shodow?: string;
      shodowColor?: string;
      tableRow?: string;
      tableBackground?: string;
    };
  }

  interface Palette {
    customColors?: {
      greyText?: string;
      darkGrey?: string;
      darkBackgroundColor?: string;
      darkGray?: string;
      themeBackground?: string;
      sectionBackgroundColor?: string;
      shodow?: string;
      shodowColor?: string;
      tableRow?: string;
      tableBackground?: string;
    };
  }

  interface Theme {
    customizedTextStyles: {
      labelStyles?: React.CSSProperties;
    };
  }

  interface ThemeOptions {
    customizedTextStyles?: {
      labelStyles?: React.CSSProperties;
    };
  }
}

const staticThemeColors = {
  grey: {
    50: "#F0F2F5",
    100: "#EAEAEA",
    200: "#D5D5D5",
    300: "#CACACA",
    400: "#C0C0C0",
    500: "#B5B5B5",
    600: "#A0A0A0",
    700: "#8A8A8A",
    800: "#808080",
    900: "#555555",
  },
};

const theme = (mode: PaletteMode, mainColor: string) => {
  const customTheme: ThemeOptions = {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#FFFFFF",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.2))",
          },
        },
      },
    },
    palette: {
      mode,
      common: {
        white: mode === "light" ? "#FFFFFF" : "#000000",
        black: mode === "light" ? "#000000" : "#FFFFFF",
      },
      text: {
        primary: mode === "light" ? "#252525ff" : "#d1d1d1ff",
      },
      primary: {
        main: mainColor,
        light:
          mode === "light" ? lighten(mainColor, 0.2) : lighten(mainColor, 0.1),
        dark:
          mode === "light" ? darken(mainColor, 0.2) : darken(mainColor, 0.1),
        contrastText: "#FFFFFF",
        light100: lighten(mainColor, 0.4),
        light200: lighten(mainColor, 0.3),
        light300: lighten(mainColor, 0.2),
        light400: lighten(mainColor, 0.1),
        opacityMain: mainColor + "20",
      },
      secondary: {
        main: "#1E88E5",
        light: mode === "light" ? "#D8EAFA" : "#156BB6",
        light100: "#A7D1F5",
        light200: "#8AC1F1",
        light300: "#6DB2EE",
        light400: "#50A2EA",
        contrastText: "#FFFFFF",
      },
      customColors: {
        greyText: mode === "light" ? "#5A5A5A" : "#d3d3d3",
        darkGrey: "#2d2d2d",
        darkBackgroundColor:
          mode === "dark" ? darken(mainColor, 0.9) : lighten(mainColor, 0.95),
        darkGray: darken(mainColor, 0.5),
        sectionBackgroundColor:
          mode === "dark" ? "#222222ff" : lighten(mainColor, 1),
        shodowColor:
          mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)",
        shodow:
          mode === "dark"
            ? "0 0 5px rgba(255, 255, 255, 0.1)"
            : "0 0 5px rgba(0, 0, 0, 0.2)",
        tableBackground:
          mode === "dark" ? darken(mainColor, 0.9) : lighten(mainColor, 0.95),
        tableRow: mode === "dark" ? "#222222ff" : "#fff",
      },
      error: {
        main: mode === "light" ? "#D94646" : "#AD2323",
        contrastText: "#FFFFFF",
      },
      warning: {
        main: mode === "light" ? "#FFCE3B" : "#F9BB00",
        contrastText: "#FFFFFF",
      },
      success: {
        main: mode === "light" ? "#00C853" : "#008A3A",
        contrastText: "#FFFFFF",
      },
      grey: staticThemeColors.grey,
    },
    typography: {
      fontFamily: ["Noto Sans", "sans-serif"].join(","),
      htmlFontSize: 16,
      fontSize: 14, // base font size for rem calculations
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,

      h1: {
        fontSize: "3rem", // ~48px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2.25rem", // ~36px
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem", // ~28px
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.5rem", // ~24px
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.25rem", // ~20px
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: "1rem", // ~16px
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem", // 16px
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontSize: "0.875rem", // 14px
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      caption: {
        fontSize: "0.75rem", // 12px
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      button: {
        fontSize: "0.875rem", // 14px
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "none",
      },
    },
    customizedTextStyles: {
      labelStyles: {
        fontFamily: "Noto Sans",
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.66,
        color:
          mode === "light"
            ? staticThemeColors.grey[900]
            : staticThemeColors.grey[400],
      },
    },
    shape: {
      borderRadius: 10,
    },
  };

  return responsiveFontSizes(createTheme(customTheme), { factor: 2.3 });
};

export default theme;
