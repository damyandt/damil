import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { LeftNavList } from "../layoutVariables";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BarChartIcon from '@mui/icons-material/BarChart';

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
          text: "Gym Visits",
          url: "/DAMIL-Analytics/Visits",
          Icon: BarChartIcon,
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

export const NAV_DAMIL_GYMS: LeftNavMenu = {
  title: LEFT_NAV_SECTION["DAMIL Gyms"],
  list: [
    {
      text: "Register",
      url: '/DAMIL-Gyms/Register',
      Icon: AppRegistrationIcon,
      disabled: false,
    }
  ],
};
