import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import GymVisitsChart from "../../pages/Analystics/GymVisitsChart";
import GoalMembersGaugeChart from "../../pages/Analystics/Goal";
import AgeDistributionChart from "../../pages/Analystics/AgeChart";
import Memberships from "../../pages/Analystics/Memberships";
import OverviewPage from "../../pages/Analystics/Overview";
import ClientsPage from "../../pages/Access Control/Clients";
import DailyVisitors from "../../pages/Access Control/DailyVisitors";
import ErrorPage from "./ErrorPage";
import EmployeeCalendar from "../../pages/Staff/Calender";
import StaffPage from "../../pages/Staff/StaffMembersPage";
import StaffRolesPage from "../../pages/Staff/StaffRolesPage";
import StaffShifts from "../../pages/Staff/Shifts/StaffShifts";
import HomePage from "../../pages/Home/Home";
import ProfilePage from "../../pages/usersPages/Profile";
import PlansPage from "../../pages/usersPages/PlansPage";
import PageNotFound from "../../components/pageComponents/PageNotFound";
import SubscriptionPlans from "../../pages/Configurations/SubscriptionPlans";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />, // 👈 Add this
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/",
        element: <HomePage />,
      },

      // Analystics
      {
        path: "/DAMIL-Analytics/Overview",
        element: <OverviewPage />,
      },
      {
        path: "/DAMIL-Analytics/Visits",
        element: <GymVisitsChart height={92} />,
      },
      {
        path: "/DAMIL-Analytics/Goal",
        element: <GoalMembersGaugeChart value={68} height={92} />,
      },
      {
        path: "/DAMIL-Analytics/Ages",
        element: <AgeDistributionChart height={92} />,
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
        path: "/DAMIL-Access-Control/All-Clients/:filter",
        element: <ClientsPage />,
      },
      {
        path: "/DAMIL-Access-Control/Daily-Visitors",
        element: <DailyVisitors />,
      },

      // Staff
      {
        path: "/DAMIL-Staff/All",
        element: <StaffPage />,
      },
      {
        path: "/DAMIL-Staff/Roles",
        element: <StaffRolesPage />,
      },
      {
        path: "/DAMIL-Staff/Shifts",
        element: <StaffShifts />,
      },
      {
        path: "/DAMIL-Staff/Events",
        element: <EmployeeCalendar />,
      },
      // Configurations
      {
        path: "/DAMIL-Configurations/Profile",
        element: <ProfilePage />,
      },
      {
        path: "/DAMIL-Configurations/Member-Plans",
        element: <SubscriptionPlans />,
      },
      {
        path: "/DAMIL-Configurations/Subscription-Plans",
        element: <PlansPage />,
      },
    ],
  },
]);
