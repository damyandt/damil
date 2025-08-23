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
  if (authedUser.email !== "error") {
    // const appRouter = createAppRouter("FACILITY_ADMIN");
    const role: string = authedUser.role[0].name;
    const appRouter = createAppRouter(authedUser.role[0].name);
    return (
      <Box component="main">
        <RouterProvider router={appRouter} />
      </Box>
    );
  }

  return <GuestLayout />;
};

export default App;
