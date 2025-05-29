import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../Layout";
import ComingSoonPage from "../../pages/ComingSoonPage";
import ROUTES_MAPPING from "./routesMapping";
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
        path: '/DAMIL-Gyms/Register',
        element: <RegisterPage />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },

]);
