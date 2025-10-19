import { createContext, JSX, useContext, useEffect, useState } from "react";
import { getCookie } from "../Global/Utils/commonFunctions";
import callApi, { COOKIE_REFRESH_TOKEN } from "../API/callApi";
import { User } from "../pages/usersPages/userTypes";
import {
  getQueryUsersGetCurrentUser,
  getQueryUserTenant,
} from "../Auth/API/apiAuthGetQueries";
import { handleFetchUserAccessToken } from "./authContextUtils";
import { PreferencesType, Response } from "../Global/Types/commonTypes";
import { getPreferences } from "../pages/usersPages/api/getQueries";
import { PaletteMode } from "@mui/material";

export type GetQueryUsersGetCurrentUserSnippet = { user: User };

interface UserContextType {
  authedUser: Partial<User>;
  setAuthedUser: (value: React.SetStateAction<Partial<User>>) => void;
  setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshUserData: React.Dispatch<React.SetStateAction<boolean>>;
  authedUserLoading: boolean;
  tenantLoading: boolean;
  showIncompleteModal: boolean;
  snoozeModal: (minutes?: number) => void;
  preferences: PreferencesType;
  tenant: any;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface AuthContextProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContext = ({ children }: AuthContextProps): React.ReactElement => {
  const [authedUser, setAuthedUser] = useState<Partial<User>>({
    email: "error",
  });
  const [tenant, setTenant] = useState<any>({});
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTenant, setLoadingTenant] = useState<boolean>(false);
  const [refreshUserData, setRefreshUserData] = useState<boolean>(false);
  const [showIncompleteModal, setShowIncompleteModal] =
    useState<boolean>(false);
  const storedMode = localStorage.getItem("themeMode");
  const defaultMode: PaletteMode =
    storedMode === "dark" || storedMode === "light" ? storedMode : "light";

  const [preferences, setPreferences] = useState<PreferencesType>({
    themeColor: localStorage.getItem("themeColor") || "#a250fa",
    mode: defaultMode,
    currency: "BGN",
    language: "bg",
    homeFilters: [
      "gender - MALE",
      "employment - REGULAR",
      "employment - STUDENT",
      "gender - MALE",
    ],
  });

  const fetchUserData = async () => {
    const userInfo = await callApi<Response<any>>({
      query: getQueryUsersGetCurrentUser(),
      auth: { setAuthedUser },
    });

    userInfo.success && userInfo.data && setAuthedUser(userInfo.data);
  };

  useEffect(() => {
    refreshUserData && fetchUserData();
    setRefreshUserData(false);
  }, [refreshUserData]);

  const fetchPreferences = async () => {
    if (!authedUser.roles?.includes("Facility Member")) {
      const preferencesInfo = await callApi<Response<any>>({
        query: getPreferences(),
        auth: { setAuthedUser },
      });
      preferencesInfo.success &&
        preferencesInfo.data.settings &&
        setPreferences(preferencesInfo.data.settings);
    }
  };

  const fetchTenant = async () => {
    try {
      setLoadingTenant(true);
      const tenantInfo = await callApi<any>({
        query: getQueryUserTenant(),
        auth: { setAuthedUser },
      });
      tenantInfo.success === true && setTenant(tenantInfo.data);
      setLoadingTenant(false);
    } catch (err) {
      console.error("Tenant fetch error", err);
    }
  };

  useEffect(() => {
    if (userSignedIn) {
      fetchPreferences();
      if (authedUser.roles?.includes("Facility Admin")) {
        fetchTenant();
      }
    }
  }, [userSignedIn]);

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
        console.error("Authed user error", err);
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
        tenantLoading: loadingTenant,
        showIncompleteModal,
        snoozeModal,
        preferences,
        setRefreshUserData,
        tenant,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;

export const useAuthedContext = (): UserContextType => useContext(UserContext);
