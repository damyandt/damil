import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Layout/Router/AppRouter";
import GuestLayout from "./Layout/GuestLayout";
import { useAuthedContext } from "./context/AuthContext";

const App: React.FC = () => {
  const { authedUser } = useAuthedContext();
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
