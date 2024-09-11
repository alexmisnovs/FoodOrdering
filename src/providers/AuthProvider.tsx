import { createContext, useContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({ session: null, loading: true });

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      // TODO error handling in case of no session and api failure
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      // console.log(data.session?.user?.email);
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };
    fetchSession();
    console.log("Provider is mounted");
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  return useContext(AuthContext);
};
