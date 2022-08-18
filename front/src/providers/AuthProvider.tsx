import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: number;
  email: string;
  name: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (data: SignInData) => void;
  signOut: () => void;
  getUserData: (token: string) => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("@Demo:token") || ""
  );
  const [user, setUser] = useState<User>(() => {
    let user = localStorage.getItem("@Demo:user");
    if (user) {
      return JSON.parse(user);
    }
    return {} as User;
  });

  const [userId, setUserId] = useState<number>();

  const signIn = (data: SignInData) => {
    api
      .post("/login", data)
      .then((res) => {
        history.push("/dashboard");
        const { accessToken, user } = res.data;
        localStorage.setItem("@Demo:token", accessToken);
        setAccessToken(accessToken);
        setUserId(user.id);
      })
      .catch((err) => console.log(err));
  };

  const getUserData = (token: string) => {
    api
      .get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        delete res.data.password;
        console.log(res.data);
        localStorage.setItem("@Demo:user", JSON.stringify(user));
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const signOut = () => {
    localStorage.removeItem("@Demo:token");
    localStorage.removeItem("@Demo:user");
    setAccessToken("");
    // setUser({} as User);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        signIn,
        signOut,
        getUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
