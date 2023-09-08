import React, { useState, createContext } from "react";
import {
  setLoginSesionApi,
  setLogoutSesionApi,
  getSesionApi,
} from "../api/sesionStorage";

export const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);

  const login = async (userData) => {
    setAuth(userData);
    await setLoginSesionApi(userData);
  };

  const logout = async () => {
    setAuth(undefined);
    await setLogoutSesionApi();
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
