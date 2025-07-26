import { createContext, JSX, useContext, useEffect, useState } from "react";
import { getCookie } from "../Global/Utils/commonFunctions";
import callApi, { COOKIE_REFRESH_TOKEN } from "../API/callApi";
import { Gym } from "../pages/usersPages/userTypes";
import { getQueryUsersGetCurrentUser } from "../Auth/API/apiAuthGetQueries";
import { handleFetchUserAccessToken } from "./authContextUtils";

export type GetQueryUsersGetCurrentUserSnippet = { user: Gym };
interface UserContextType {
  authedUser: Gym | null;
  setAuthedUser: (value: React.SetStateAction<Gym | null>) => void;
  setUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  authedUserLoading: boolean;
  showIncompleteModal: boolean;
  snoozeModal: (minutes?: number) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface AuthContextProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContext = ({ children }: AuthContextProps): React.ReactElement => {
  const [authedUser, setAuthedUser] = useState<Gym | null>(null);
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showIncompleteModal, setShowIncompleteModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (authedUser === null && userSignedIn) {
      setUserSignedIn(false);
    } else if (authedUser !== null && !userSignedIn) {
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
      const hasEmptyFields = Object.values(authedUser).some(
        (val: any) => val === null
      );
      console.log(hasEmptyFields);
      const snoozeUntil = localStorage.getItem("incompleteProfileSnooze");
      const now = Date.now();

      if (hasEmptyFields && (!snoozeUntil || now > parseInt(snoozeUntil))) {
        setShowIncompleteModal(true);
      }
    }
  }, [authedUser]);

  const checkIfUserIsSignedIn = async () => {
    const refreshToken = getCookie(COOKIE_REFRESH_TOKEN);
    if (refreshToken) {
      // 1. fetch the accessToken and save it as a cookie
      await handleFetchUserAccessToken(refreshToken);
      // 2. fetch and save userData
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;

export const useAuthedContext = (): UserContextType => useContext(UserContext);
