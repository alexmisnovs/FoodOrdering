import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

type AuthData = {
  session: Session | null;
  authToken: string | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  authToken: null,
  profile: null,
  isAdmin: false
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // const [supabaseEvent, setSupabaseEvent] = useState("INITIAL_SESSION");

  // maybe add session checking function..

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        setProfile(data || null);
        setIsAdmin(data.group === "ADMIN");
      }

      setLoading(false);
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      // setSession(session);
      console.log("Event: ", _event, "Session: ", session?.token_type);
      if (session) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            console.log("trying to call profile data onAuthStateChange: ", data);
            if (data) {
              setProfile(data);
              console.log("User admin check from onAuthStateChange: ", data?.group === "ADMIN");
              setIsAdmin(data?.group === "ADMIN");
              setSession(session);
            }
          });
      }

      setSession(null);
      setLoading(false);
    });
  }, []);

  //   supabase.auth
  //     .getSession()
  //     .then(res => {
  //       const {
  //         data: { session }
  //       } = res;
  //       supabase.auth.onAuthStateChange((_event, session) => {
  //         setSession(session);
  //       });
  //       setSession(session);
  //       return session;
  //     })
  //     .then(session => {
  //       if (session) {
  //         supabase
  //           .from("profiles")
  //           .select("*")
  //           .eq("id", session.user.id)
  //           .single()
  //           .then(res => {
  //             const { data } = res;
  //             setProfile(data || null);
  //           });
  //       }
  //     })
  //     .then(() => setLoading(false));
  // }, []);
  // @ts-ignore
  return <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
