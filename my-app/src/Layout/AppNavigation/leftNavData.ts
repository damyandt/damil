import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { LeftNavList } from "../layoutVariables";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import ClassIcon from "@mui/icons-material/Class";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

enum LEFT_NAV_SECTION {
  "Home" = "Home",
  "DAMIL Analytics" = "DAMIL Analytics",
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
          text: "Fitness visit count",
          url: "/DAMIL-Analytics/Production-KPIs",
          Icon: PrecisionManufacturingIcon,
          disabled: false,
        },
        {
          text: "Memberships",
          url: "/DAMIL-Analytics/Financial-KPIs",
          Icon: LocalAtmOutlinedIcon,
          disabled: false,
        },
      ],
    },
    
  ],
};
