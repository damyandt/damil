import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import appRouter from "./Layout/Router/AppRouter";

const App: React.FC = () => {
  return (
    <Box component="main">
      <RouterProvider router={appRouter} />
    </Box>
  );
};

export default App;
