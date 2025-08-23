import { createContext, JSX, useContext, useEffect, useState } from "react";
import { getCookie } from "../Global/Utils/commonFunctions";
import callApi, { COOKIE_REFRESH_TOKEN } from "../API/callApi";
import { Business } from "../pages/usersPages/userTypes";
import { getQueryUsersGetCurrentUser } from "../Auth/API/apiAuthGetQueries";
import { handleFetchUserAccessToken } from "./authContextUtils";
import { PreferencesType, Response } from "../Global/Types/commonTypes";
import { getPreferences } from "../pages/usersPages/api/postQuery";
import { PaletteMode } from "@mui/material";

export type GetQueryUsersGetCurrentUserSnippet = { user: Business };

interface UserContextType {
  authedUser: Business;
  setAuthedUser: (value: React.SetStateAction<Business>) => void;
  setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authedUserLoading: boolean;
  showIncompleteModal: boolean;
  snoozeModal: (minutes?: number) => void;
  preferences: PreferencesType;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface AuthContextProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContext = ({ children }: AuthContextProps): React.ReactElement => {
  const [authedUser, setAuthedUser] = useState<Business>({
    username: "error",
    email: "error",
    phone: "error",
    address: "error",
    city: "error",
    membersCount: 0,
    subscriptionActive: false,
    role: "FACILITY_MEMBER",
  });
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showIncompleteModal, setShowIncompleteModal] =
    useState<boolean>(false);
  const [preferences, setPreferences] = useState<PreferencesType>({
    themeColor: localStorage.getItem("themeColor") || "#a250fa",
    mode: (localStorage.getItem("themeMode") as PaletteMode) || "light",
    currency: "BGN",
    language: "en",
    homeFilters: [
      "Gender - MALE",
      "SubscriptionStatus - ACTIVE",
      "Employment - REGULAR",
      "SubscriptionPlan - MONTHLY",
    ],
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      const preferencesInfo = await callApi<Response<any>>({
        query: getPreferences(),
        auth: { setAuthedUser },
      });
      preferencesInfo.success &&
        preferencesInfo.data.settings &&
        setPreferences(preferencesInfo.data.settings);
    };

    authedUser && fetchPreferences();
  }, [setAuthedUser]);

  useEffect(() => {
    if (authedUser.email === "error" && userSignedIn) {
      setUserSignedIn(false);
    } else if (authedUser.email !== "error" && !userSignedIn) {
      setUserSignedIn(true);
    }
  }, [authedUser?.id]);

  useEffect(() => {
    (async () => {
      try {
        if (!authedUser?.id) {
          setLoading(true);
          await checkIfUserIsSignedIn();
        }
      } catch (err) {
        console.log("Authed user error");
      }
      setLoading(false);
    })();
  }, [userSignedIn]);

  useEffect(() => {
    if (authedUser) {
      let hasEmptyFields =
        Object.values(authedUser).some(
          (val: any) => val === "" || val === null
        ) ||
        Object.values(preferences).some(
          (val: any) => val === "" || val === null
        );

      const snoozeUntil = localStorage.getItem("incompleteProfileSnooze");
      const now = Date.now();

      if (hasEmptyFields && (!snoozeUntil || now > parseInt(snoozeUntil))) {
        setShowIncompleteModal(true);
      }
    }
  }, [authedUser, preferences]);

  const checkIfUserIsSignedIn = async () => {
    const refreshToken = getCookie(COOKIE_REFRESH_TOKEN);
    if (refreshToken) {
      await handleFetchUserAccessToken(refreshToken);

      const signedInUser = await callApi<any>({
        query: getQueryUsersGetCurrentUser(),
        auth: { setAuthedUser },
      });

      setAuthedUser({
        ...signedInUser.data,
      });

      return;
    }
  };

  const snoozeModal = (minutes = 30) => {
    const snoozeUntil = Date.now() + minutes * 60 * 1000;
    localStorage.setItem("incompleteProfileSnooze", snoozeUntil.toString());
    setShowIncompleteModal(false);
  };

  return (
    <UserContext.Provider
      value={{
        authedUser,
        setAuthedUser,
        setUserSignedIn,
        authedUserLoading: loading,
        showIncompleteModal,
        snoozeModal,
        preferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;

export const useAuthedContext = (): UserContextType => useContext(UserContext);
