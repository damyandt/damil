import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { LeftNavList } from "../layoutVariables";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PieChartIcon from "@mui/icons-material/PieChart";
import FlagIcon from "@mui/icons-material/Flag";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TuneIcon from "@mui/icons-material/Tune";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

enum LEFT_NAV_SECTION {
  "Home" = "Home",
  "DAMIL Analytics" = "DAMIL Analytics",
  "DAMIL Gyms" = "DAMIL Gyms",
  "DAMIL Access Control" = "DAMIL Access Control",
  "DAMIL Staff Members" = "DAMIL Staff Members",
  "DAMIL Configurations" = "DAMIL Configurations",
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

export const NAV_DAMIL_ACCESS_CONTROL: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Access Control"],
  list: [
    {
      text: "Access Controll",
      url: null,
      Icon: MeetingRoomIcon,
      disabled: false,
      nested: [
        {
          text: "Clients",
          url: "/DAMIL-Access-Control/All-Clients",
          Icon: PersonAddAlt1Icon,
          disabled: false,
        },
        {
          text: "Daily Visitors",
          url: "/DAMIL-Access-Control/Daily-Visitors",
          Icon: GroupsIcon,
          disabled: false,
        },
      ],
    },
  ],
};

export const NAV_DAMIL_STAFF: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Staff Members"],
  list: [
    {
      text: "Staff",
      url: null,
      Icon: BadgeIcon,
      disabled: false,
      nested: [
        {
          text: "Staff Members",
          url: "/DAMIL-Staff/All",
          Icon: GroupIcon,
          disabled: false,
        },
        {
          text: "Staff Roles",
          url: "/DAMIL-Staff/Roles",
          Icon: AdminPanelSettingsIcon,
          disabled: false,
        },
        {
          text: "Staff Shifts",
          url: "/DAMIL-Staff/Shifts",
          Icon: AccessTimeIcon,
          disabled: false,
        },
        {
          text: "Events",
          url: "/DAMIL-Staff/Events",
          Icon: DateRangeIcon,
          disabled: false,
        },
      ],
    },
  ],
};
export const NAV_DAMIL_CONFIGURATIONS: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Configurations"],
  list: [
    {
      text: "Configurations",
      url: null,
      Icon: TuneIcon,
      disabled: false,
      nested: [
        {
          text: "Profile",
          url: "/DAMIL-Configurations/Profile",
          Icon: AssignmentIndIcon,
          disabled: false,
        },
        {
          text: "Subscription Plans",
          url: "/DAMIL-Configurations/Subscription-Plans",
          Icon: SubscriptionsIcon,
          disabled: false,
        },
      ],
    },
  ],
};
