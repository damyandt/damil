import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import RegisterPage from "../../pages/usersPages/Register";
import GymVisitsChart from "../../pages/Analystics/GymVisitsChart";
import GoalMembersGaugeChart from "../../pages/Analystics/Goal";
import AgeDistributionChart from "../../pages/Analystics/AgeChart";
import Memberships from "../../pages/Analystics/Memberships";
import OverviewPage from "../../pages/Analystics/Overview";
import ClientsPage from "../../pages/Access Control/Clients";
import DailyVisitors from "../../pages/Access Control/DailyVisitors";
import PageNotFound from "../../pages/PageNotFound";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/DAMIL-Gyms/Register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },

      // Analystics
      {
        path: "/DAMIL-Analytics/Overview",
        element: <OverviewPage />,
      },
      {
        path: "/DAMIL-Analytics/Visits",
        element: <GymVisitsChart height={87} />,
      },
      {
        path: "/DAMIL-Analytics/Goal",
        element: <GoalMembersGaugeChart value={68} height={87} />,
      },
      {
        path: "/DAMIL-Analytics/Ages",
        element: <AgeDistributionChart height={87} />,
      },
      {
        path: "/DAMIL-Analytics/Memberships",
        element: <Memberships />,
      },

      //Access Control
      {
        path: "/DAMIL-Access-Control/All-Clients",
        element: <ClientsPage />,
      },
      {
        path: "/DAMIL-Access-Control/Daily-Visitors",
        element: <DailyVisitors />,
      },
    ],
  },
]);
