import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./Layout/Router/AppRouter";
import GuestLayout from "./Layout/GuestLayout";
import { useAuthedContext } from "./context/AuthContext";
import LoadingScreen from "./components/pageComponents/LoadingPage";
import GlobalBarcodeScanner from "./context/BarcodeProvider";

const App: React.FC = () => {
  const { authedUser, authedUserLoading, tenant } = useAuthedContext();

  if (authedUserLoading) {
    return <LoadingScreen />;
  }
  const role:
    | "Facility Member"
    | "Facility Admin"
    | "System Admin"
    | "Facility Staff" = authedUser?.roles?.[0] || "Facility Member";
  const abonnement: "PRO" | "BASIC" | "GROWTH" | null = tenant?.abonnement;
  const appRouter = createAppRouter(role, abonnement);
  if (authedUser.email !== "error") {
    return (
      <Box component="main">
        <GlobalBarcodeScanner />
        <RouterProvider router={appRouter} />
      </Box>
    );
  }

  return <GuestLayout />;
};

export default App;
