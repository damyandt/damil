import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Layout/Router/AppRouter";
import GuestLayout from "./Layout/GuestLayout";
import { useAuthedContext } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingPage";

const App: React.FC = () => {
  const { authedUser, authedUserLoading } = useAuthedContext();

  // if (authedUserLoading) {
  //   return <LoadingScreen />;
  // }

  // if (authedUser) {
  return (
    <Box component="main">
      <RouterProvider router={appRouter} />
    </Box>
  );
  // }

  return <GuestLayout />;
};

export default App;
