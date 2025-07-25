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
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface AuthContextProps {
  children: JSX.Element | JSX.Element[];
}

const AuthContext = ({ children }: AuthContextProps): React.ReactElement => {
  const [authedUser, setAuthedUser] = useState<Gym | null>(null);
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <UserContext.Provider
      value={{
        authedUser,
        setAuthedUser,
        setUserSignedIn,
        authedUserLoading: loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;

export const useAuthedContext = (): UserContextType => useContext(UserContext);
