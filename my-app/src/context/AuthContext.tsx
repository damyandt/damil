import { createContext, JSX, useContext, useEffect, useState } from "react";
import { getCookie } from "../Global/Utils/commonFunctions";
import callApi, { COOKIE_REFRESH_TOKEN } from "../API/callApi";
import {
  getQueryUsersGetCurrentUser,
  getQueryUserTenant,
} from "../Auth/API/apiAuthGetQueries";
import { handleFetchUserAccessToken } from "./authContextUtils";
import { PreferencesType, Response } from "../Global/Types/commonTypes";
import { getPreferences } from "../pages/usersPages/api/getQueries";
import { PaletteMode } from "@mui/material";
import { User } from "../pages/usersPages/api/userTypes";
import {
  defaultHomeAnalytics,
  incompleteModalFields,
} from "./authContextTypes";

export type GetQueryUsersGetCurrentUserSnippet = { user: User };

interface UserContextType {
  authedUser: Partial<User>;
  setAuthedUser: (value: React.SetStateAction<Partial<User>>) => void;
  setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshUserData: React.Dispatch<React.SetStateAction<boolean>>;
  authedUserLoading: boolean;
  tenantLoading: boolean;
  showIncompleteModal: boolean;
  showChangePasswordModal: boolean;
  setShowChangePasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const storedMode = localStorage.getItem("themeMode");
  const defaultMode: PaletteMode =
    storedMode === "dark" || storedMode === "light" ? storedMode : "light";

  const [preferences, setPreferences] = useState<PreferencesType>({
    themeColor: localStorage.getItem("themeColor") || "#a250fa",
    mode: defaultMode,
    currency: "BGN",
    language: "bg",
    homeFilters: defaultHomeAnalytics,
  });

  const fetchUserData = async () => {
    try {
      const userInfo = await callApi<Response<any>>({
        query: getQueryUsersGetCurrentUser(),
        auth: { setAuthedUser },
      });

      userInfo.data && setAuthedUser(userInfo.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshUserData && fetchUserData();
    setRefreshUserData(false);
  }, [refreshUserData]);

  const fetchPreferences = async () => {
    if (!authedUser.roles?.includes("Member")) {
      try {
        const preferencesInfo = await callApi<Response<any>>({
          query: getPreferences(),
          auth: { setAuthedUser },
        });

        // If settings is missing, null, or has empty homeFilters, set defaults
        if (preferencesInfo.data.settings.homeFilters.length >= 0) {
          setPreferences((prev) => ({
            ...prev,
            homeFilters: defaultHomeAnalytics,
          }));
        } else {
          setPreferences(preferencesInfo.data.settings);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchTenant = async () => {
    try {
      const tenantInfo = await callApi<any>({
        query: getQueryUserTenant(),
        auth: { setAuthedUser },
      });
      setTenant(tenantInfo.data);
    } catch (err) {
      console.error("Tenant fetch error", err);
    } finally {
      setLoadingTenant(false);
    }
  };

  useEffect(() => {
    if (userSignedIn) {
      fetchPreferences();
      if (
        authedUser.roles?.includes("Admin") ||
        authedUser.roles?.includes("Staff") ||
        authedUser.roles?.includes("Member")
      ) {
        setLoadingTenant(true);
        fetchTenant();
      } else {
        // If user doesn't need tenant data, mark tenant loading as complete
        setLoadingTenant(false);
      }
    }
  }, [userSignedIn]);

  useEffect(() => {
    if (authedUser.email === "error" && userSignedIn) {
      setUserSignedIn(false);
    } else if (authedUser.email !== "error" && !userSignedIn) {
      setUserSignedIn(true);
    }

    if (authedUser && authedUser.passwordChanged === false) {
      setShowChangePasswordModal(true);
    } else {
      setShowChangePasswordModal(false);
    }
  }, [authedUser?.id, authedUser?.passwordChanged, userSignedIn]);

  useEffect(() => {
    (async () => {
      try {
        if (!authedUser?.id) {
          setLoading(true);
          setLoadingTenant(true);
          await checkIfUserIsSignedIn();
        }
      } catch (err) {
        console.error("Authed user error", err);
        setLoadingTenant(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [userSignedIn]);

  useEffect(() => {
    if (authedUser.email !== "error" && userSignedIn) {
      let hasEmptyFields = incompleteModalFields.some(
        (key) => !(authedUser as User)[key] || (authedUser as any)[key] === ""
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
    } else {
      setLoadingTenant(false);
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
        showChangePasswordModal,
        setShowChangePasswordModal,
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
