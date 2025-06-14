import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { LeftNavList } from "../layoutVariables";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PieChartIcon from "@mui/icons-material/PieChart";
import FlagIcon from "@mui/icons-material/Flag";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";

enum LEFT_NAV_SECTION {
  "Home" = "Home",
  "DAMIL Analytics" = "DAMIL Analytics",
  "DAMIL Gyms" = "DAMIL Gyms",
}

type LeftNavMenu = {
  title: keyof typeof LEFT_NAV_SECTION;
  list: LeftNavList;
};

export const NAV_DAMIL_HOME: LeftNavMenu = {
  title: LEFT_NAV_SECTION["Home"],
  list: [
    {
      text: "Home",
      url: "/",
      Icon: HomeOutlinedIcon,
      disabled: false,
    },
  ],
};

export const NAV_DAMIL_ANALYTICS: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Analytics"],
  list: [
    {
      text: "Analytics",
      url: null,
      Icon: BallotOutlinedIcon,
      disabled: false,
      nested: [
        {
          text: "Overview",
          url: "/DAMIL-Analytics/Overview",
          Icon: DashboardIcon,
          disabled: false,
        },
        {
          text: "Gym Visits",
          url: "/DAMIL-Analytics/Visits",
          Icon: BarChartIcon,
          disabled: false,
        },
        {
          text: "Monthly Goal",
          url: "/DAMIL-Analytics/Goal",
          Icon: FlagIcon,
          disabled: false,
        },
        {
          text: "Age Breakdown",
          url: "/DAMIL-Analytics/Ages",
          Icon: PieChartIcon,
          disabled: false,
        },
        {
          text: "Memberships",
          url: "/DAMIL-Analytics/Memberships",
          Icon: CardMembershipIcon,
          disabled: false,
        },
      ],
    },
  ],
};

export const NAV_DAMIL_GYMS: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Gyms"],
  list: [
    {
      text: "Register",
      url: "/DAMIL-Gyms/Register",
      Icon: AppRegistrationIcon,
      disabled: false,
    },
  ],
};
