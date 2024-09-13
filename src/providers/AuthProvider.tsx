import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

type AuthData = {
  session: Session | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProfile = async (session: Session) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
    console.log("found this profile from onAuthStateChange", data);

    setProfile(data || null);

    const isAdmin = data?.group === "ADMIN";
    setIsAdmin(isAdmin);

    console.log("Admin status:", isAdmin);
    console.log("Profile group:", data!.group);
  };

  const fetchSession = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    setSession(session);

    // if (!session) {
    //   console.log("Session was not found, trying to fetch it again..");
    //   // return;
    //   const {
    //     data: { session }
    //   } = await supabase.auth.getSession();

    //   setSession(session);
    // }

    if (session) {
      // fetch profile
      fetchProfile(session);
    }
    setLoading(false);
  };

  useEffect(() => {
    //check if session is not null
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, _session) => {
      console.log(`Supbase auth event: ${event}`);

      if (event === "SIGNED_IN") {
        //fetch session?
        // first check the session
        if (!session) fetchSession();
        return;
      }
      if (event === "SIGNED_OUT") {
        console.log("removing session");
        setSession(null);
        setProfile(null);
        setIsAdmin(false);
        return;
      }
      setSession(_session);
    });

    setLoading(false);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // @ts-ignore
  return <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
