import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import PageNotFound from "../../pages/PageNotFound";
import RegisterPage from "../../pages/usersPages/Register";
import GymVisitsChart from "../../pages/GymVisitsChart";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/DAMIL-Analytics/Visits",
        element: <GymVisitsChart />,
      },
      {
        path: "/DAMIL-Gyms/Register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
