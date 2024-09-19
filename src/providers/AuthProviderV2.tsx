import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../helpers/auth";

type AuthData = {
  authToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  authenticate(token: string): void;
  checkIfAdmin(profile: any): boolean;
  logout(): void;
};

const AuthContext = createContext<AuthData>({
  isAuthenticated: false,
  authToken: null,
  isAdmin: false,
  authenticate: () => {},
  checkIfAdmin: () => false,
  logout: () => {}
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  function authenticate(token: string) {
    setAuthToken(token);
    setIsAuthenticated(true);
  }
  function logout() {
    setAuthToken(null);
    setIsAuthenticated(false);
  }

  async function checkIfAdmin(profile: any) {
    setIsAdmin(profile.group === "ADMIN");
  }
  // @ts-ignore
  return <AuthContext.Provider value={{ isAuthenticated, isAdmin, logout: logout, authenticate: authenticate, checkIfAdmin: checkIfAdmin }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
