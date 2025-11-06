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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TuneIcon from "@mui/icons-material/Tune";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOnOutlined";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PaidIcon from "@mui/icons-material/Paid";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ClassOutlined from "@mui/icons-material/ClassOutlined";

export enum LEFT_NAV_SECTION {
  "Home" = "Home",
  "DAMIL Analytics" = "DAMIL Analytics",
  "DAMIL Access Control" = "DAMIL Access Control",
  "DAMIL Staff Members" = "DAMIL Staff Members",
  "DAMIL Clients" = "DAMIL Clients",
  "DAMIL Configurations" = "DAMIL Configurations",
  "Member Schedule" = "Member Schedule",
}

type LeftNavMenu = {
  title: keyof typeof LEFT_NAV_SECTION;
  list: LeftNavList;
};

// Home
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
export const NAV_DAMIL_CLASSES: LeftNavMenu = {
  title: LEFT_NAV_SECTION["Member Schedule"],
  list: [
    {
      text: "Classes",
      url: "Member/Classes",
      Icon: ClassOutlined,
      disabled: false,
    },
    {
      text: "Subscription",
      url: "Member/Subscription",
      Icon: PaidIcon,
      disabled: false,
    },
  ],
};
//Clients
export const NAV_DAMIL_CLIENTS: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Clients"],
  list: [
    {
      text: "Clients",
      url: null,
      Icon: GroupOutlinedIcon,
      disabled: false,
      nested: [
        {
          text: "Classes",
          url: "/DAMIL-Clients/Classes",
          Icon: FitnessCenterOutlinedIcon,
          disabled: false,
        },
        {
          text: "News",
          url: "/DAMIL-Clients/News",
          Icon: ArticleOutlinedIcon,
          disabled: false,
        },
      ],
    },
  ],
};

// Analytics
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
          text: "Visits",
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

// Access Control
export const NAV_DAMIL_ACCESS_CONTROL: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Access Control"],
  list: [
    {
      text: "Access Control",
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
          text: "Accept New Client",
          url: "/DAMIL-Access-Control/Accept-New-Client/subscriptionStatus=PENDING",
          Icon: HowToRegIcon,
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

// Staff
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

// Configurations
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
          text: "Member Plans",
          url: "/DAMIL-Configurations/Member-Plans",
          Icon: SubscriptionsIcon,
          disabled: false,
        },
        {
          text: "Subscription Plans",
          url: "/DAMIL-Configurations/Subscription-Plans",
          Icon: MonetizationOnIcon,
          disabled: false,
        },
      ],
    },
  ],
};
