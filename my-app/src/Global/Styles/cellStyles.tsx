import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useTheme } from "@mui/material";
import React from "react";

interface EnumIcons {
  color: string;
  backgroundColor: string;
  borderColor: string;
  icon?: React.ReactNode;
}

export type EnumIconsMap = Record<string, EnumIcons>;

export const useRoleStyles = (): EnumIconsMap => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return {
    manager: {
      color: isDark ? "#ffb74d" : "#f57c00",
      backgroundColor: isDark ? "#4e342e" : "#fff3e0",
      borderColor: isDark ? "#ffb74d" : "#f57c00",
      icon: <ManageAccountsIcon fontSize="small" />,
    },
    nutritionist: {
      color: isDark ? "#81c784" : "#388e3c",
      backgroundColor: isDark ? "#1b5e20" : "#e8f5e9",
      borderColor: isDark ? "#81c784" : "#388e3c",
      icon: <RestaurantIcon fontSize="small" />,
    },
    trainer: {
      color: isDark ? "#7986cb" : "#303f9f",
      backgroundColor: isDark ? "#1a237e" : "#e8eaf6",
      borderColor: isDark ? "#7986cb" : "#303f9f",
      icon: <FitnessCenterIcon fontSize="small" />,
    },
    receptionist: {
      color: isDark ? "#e0e0e0" : "#616161",
      backgroundColor: isDark ? "#424242" : "#f5f5f5",
      borderColor: isDark ? "#e0e0e0" : "#616161",
      icon: <PermContactCalendarIcon fontSize="small" />,
    },
    cleaner: {
      color: isDark ? "#ff80ab" : "#c2185b",
      backgroundColor: isDark ? "#3f2d3d" : "#fce4ec",
      borderColor: isDark ? "#ff80ab" : "#c2185b",
      icon: <CleaningServicesIcon fontSize="small" />,
    },
    physiotherapist: {
      color: isDark ? "#4dd0e1" : "#0097a7",
      backgroundColor: isDark ? "#006064" : "#e0f7fa",
      borderColor: isDark ? "#4dd0e1" : "#0097a7",
      icon: <AccessibilityNewIcon fontSize="small" />,
    },
  };
};

export const useGenderStyles = (): EnumIconsMap => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const femaleStyles = {
    icon: <FemaleIcon fontSize="small" />,
    color: isDark
      ? "#f48fb1" // lighter pink for dark mode
      : "#d81b60", // original pink
    backgroundColor: isDark
      ? "#3f2d3d" // muted dark pink background
      : "#fce4ec",
    borderColor: isDark ? "#f48fb1" : "#d81b60",
  };

  const maleStyles = {
    icon: <MaleIcon fontSize="small" />,
    color: isDark
      ? "#90caf9" // lighter blue for dark mode
      : "#1976d2", // original blue
    backgroundColor: isDark
      ? "#1e3a5f" // muted dark blue background
      : "#e3f2fd",
    borderColor: isDark ? "#90caf9" : "#1976d2",
  };

  return {
    male: maleStyles,
    female: femaleStyles,
  };
};
export const useStatusStyles = (): EnumIconsMap => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return {
    active: {
      color: isDark ? "#66bb6a" : "green",
      backgroundColor: isDark ? "#1b5e20" : "#e6ffe6",
      borderColor: isDark ? "#66bb6a" : "green",
    },
    inactive: {
      color: isDark ? "#ef5350" : "red",
      backgroundColor: isDark ? "#2a1b1b" : "#ffe6e6",
      borderColor: isDark ? "#ef5350" : "red",
    },
    pending: {
      color: isDark ? "#ffb74d" : "#ff9800",
      backgroundColor: isDark ? "#4e342e" : "#fff3e0",
      borderColor: isDark ? "#ffb74d" : "#ff9800",
    },
    cancelled: {
      color: isDark ? "#bdbdbd" : "#9e9e9e",
      backgroundColor: isDark ? "#424242" : "#f5f5f5",
      borderColor: isDark ? "#bdbdbd" : "#9e9e9e",
    },
    low: {
      color: isDark ? "#81c784" : "#388e3c",
      backgroundColor: isDark ? "#1b5e20" : "#e8f5e9",
      borderColor: isDark ? "#81c784" : "#388e3c",
    },
    medium: {
      color: isDark ? "#ffb74d" : "#f57c00",
      backgroundColor: isDark ? "#4e342e" : "#fff3e0",
      borderColor: isDark ? "#ffb74d" : "#f57c00",
    },
    high: {
      color: isDark ? "#ef9a9a" : "#c62828",
      backgroundColor: isDark ? "#3b1818" : "#ffebee",
      borderColor: isDark ? "#ef9a9a" : "#c62828",
    },
  };
};
