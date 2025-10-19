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
import StaffPage from "../../pages/Staff/StaffMembersPage";
import StaffRolesPage from "../../pages/Staff/StaffRolesPage";
import StaffShifts from "../../pages/Staff/Shifts/StaffShifts";
import HomePage from "../../pages/Home/Home";
import ProfilePage from "../../pages/usersPages/Profile";
import PlansPage from "../../pages/usersPages/PlansPage";
import PageNotFound from "../../components/pageComponents/PageNotFound";
import SubscriptionPlans from "../../pages/Configurations/SubscriptionPlans";
import {
  getAbonnementsForPage,
  getRolesForPage,
} from "../AppNavigation/PageRoles";
import MembersHome from "../../pages/MemberView/MembersHome";
import AccountCredentials from "../../components/pageComponents/UserComponents/AccountCredentials";
import SuccessPayment from "../../pages/usersPages/SuccessPayment";
import Calendar from "../../pages/Staff/Calender";
import AcceptClients from "../../pages/Access Control/AcceptClients";
import Classes from "../../pages/MemberView/Classes";
import MemberSubscription from "../../pages/MemberView/MemberSubscription";
import NewsManagementPage from "../../pages/Clients/News";
export const createAppRouter = (
  userType:
    | "Facility Member"
    | "Facility Admin"
    | "System Admin"
    | "Facility Staff",
  abonnement: "PRO" | "STARTER" | "GROWTH" | null
) => {
  let roleRoutes = getRoutesForRole(userType, abonnement);
  const finalRoutes = getRoutesForAbonnement(abonnement, roleRoutes);
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [...finalRoutes, { path: "*", element: <PageNotFound /> }],
    },
  ]);
};

const getRoutesForRole = (role: string, abonnement: string | null) => {
  if (role === "System Admin") return allRoutes(role, abonnement);
  const routes = allRoutes(role, abonnement);
  return routes.filter(
    (route) =>
      getRolesForPage(route.path!).includes(role) ||
      getRolesForPage(route.path!).includes("ALL")
  );
};
const getRoutesForAbonnement = (abonnement: string | null, roleRoutes: any) => {
  if (abonnement === "PRO") return roleRoutes;
  // const routes = allRoutes(role, abonnement);
  return roleRoutes.filter(
    (route: any) =>
      getAbonnementsForPage(route.path!).includes(
        abonnement ? abonnement : "notintheurl"
      ) || getAbonnementsForPage(route.path!).includes("ALL")
  );
};

const allRoutes = (role: string, abonnement: string | null) => {
  return [
    {
      path: "/",
      element:
        role === "Facility Member" ? (
          <MembersHome />
        ) : abonnement ? (
          <HomePage />
        ) : (
          <PlansPage />
        ),
    },
    {
      path: "Member/Classes",
      element: <Classes />,
    },
    {
      path: "Member/Subscription",
      element: <MemberSubscription />,
    },
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

    // Access Control
    {
      path: "/DAMIL-Access-Control/All-Clients",
      element: <ClientsPage />,
    },
    {
      path: "/DAMIL-Access-Control/All-Clients/:filter",
      element: <ClientsPage />,
    },
    {
      path: "/DAMIL-Access-Control/Accept-New-Client/:filter",
      element: <AcceptClients />,
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
      element: <Calendar />,
    },

    // For Clients
    {
      path: "/DAMIL-Clients/News",
      element: <NewsManagementPage />,
    },
    {
      path: "/DAMIL-Clients/Classes",
      element: <StaffRolesPage />,
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
    {
      path: "/account/change-credentials",
      element: <AccountCredentials />,
    },

    // Stripe
    {
      path: "/success",
      element: <SuccessPayment />,
    },
  ];
};
