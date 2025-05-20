import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../Layout";
import ComingSoonPage from "../../pages/ComingSoonPage";
import ROUTES_MAPPING from "./routesMapping";
import PageNotFound from "../../pages/PageNotFound";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: ROUTES_MAPPING["/DAMIL-Analytics/Production-KPIs"],
        element: <ComingSoonPage />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },

]);
