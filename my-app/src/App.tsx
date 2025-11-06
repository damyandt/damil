import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./Layout/Router/AppRouter";
import GuestLayout from "./Layout/GuestLayout";
import { useAuthedContext } from "./context/AuthContext";
import LoadingScreen from "./components/pageComponents/LoadingPage";
import GlobalBarcodeScanner from "./context/BarcodeProvider";
import { GlobalStyles } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Role } from "./pages/usersPages/api/userTypes";
// import { NavigationGuardProvider } from "./context/UnsavedChangesProvider";
const App: React.FC = () => {
  const theme = useTheme();
  const { authedUser, authedUserLoading, tenant, tenantLoading } =
    useAuthedContext();

  if (
    authedUserLoading ||
    tenantLoading ||
    !tenant ||
    Object.entries(tenant).length === 0
  ) {
    return <LoadingScreen />;
  }
  const role: Role = authedUser?.roles?.[0] || "Member";
  const abonnement: "PRO" | "STARTER" | "GROWTH" | null = tenant?.abonnement;
  const appRouter = createAppRouter(role, abonnement);
  if (authedUser.email !== "error") {
    return (
      <Box component="main">
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "*::-webkit-scrollbar-track": {
              background: theme.palette.customColors?.tableBackground,
              borderRadius: "4px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor:
                theme.palette.customColors?.scrollbarThumb || "#555",
              borderRadius: "4px",
              border:
                "2px solid " + theme.palette.customColors?.tableBackground,
            },
            "*": {
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: `${
                theme.palette.customColors?.scrollbarThumb || "#555"
              } ${theme.palette.customColors?.tableBackground}`, // Firefox
            },
          }}
        />
        <GlobalBarcodeScanner />
        <RouterProvider router={appRouter} />
      </Box>
    );
  }

  return <GuestLayout />;
};

export default App;
