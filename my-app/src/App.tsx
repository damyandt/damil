import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./Layout/Router/AppRouter";
import GuestLayout from "./Layout/GuestLayout";
import { useAuthedContext } from "./context/AuthContext";
import LoadingScreen from "./components/pageComponents/LoadingPage";

const App: React.FC = () => {
  const { authedUser, authedUserLoading } = useAuthedContext();

  if (authedUserLoading) {
    return <LoadingScreen />;
  }
  const role:
    | "Facility Member"
    | "Facility Admin"
    | "System Admin"
    | "Facility Staff" = authedUser.roles[0];
  const appRouter = createAppRouter(role);
  if (authedUser.email !== "error") {
    return (
      <Box component="main">
        <RouterProvider router={appRouter} />
      </Box>
    );
  }

  return <GuestLayout />;
};

export default App;
