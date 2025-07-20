import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Layout/Router/AppRouter";
import GuestLayout from "./Layout/GuestLayout";
import { useAuthedContext } from "./context/AuthContext";
import { useEffect } from "react";
import LoadingScreen from "./components/pageComponents/LoadingPage";

const App: React.FC = () => {
  const { authedUser, authedUserLoading } = useAuthedContext();
  useEffect(() => {
    document.body.style.backgroundColor = "#f0f2f5";
  }, []);
  if (authedUserLoading) {
    return <LoadingScreen />;
  }
  if (authedUser) {
    return (
      <Box component="main">
        <RouterProvider router={appRouter} />
      </Box>
    );
  }

  return <GuestLayout />;
};

export default App;
