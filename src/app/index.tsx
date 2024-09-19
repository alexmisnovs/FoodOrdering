import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../config/supabase";

import * as SplashScreen from "expo-splash-screen";
import { getProfile } from "../helpers/auth";

SplashScreen.preventAutoHideAsync();

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  console.log("session user from index", session?.user);
  console.log("isAdmin from index", isAdmin);

  // const [isLoadingComplete, setLoadingComplete] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   if (session) {
  //     getProfile(session).then(({ error, data }) => {
  //       if (error) {
  //         console.log("error LOADING profile from index", error);
  //         setLoadingComplete(false);
  //       }
  //       if (data) {
  //         console.log("data loading pROFILE FROM INDEX", data);
  //         setIsAdmin(data.group === "ADMIN");
  //         console.log("isAdmin ? ", isAdmin);
  //         setLoadingComplete(false);
  //       }
  //     });
  //   }
  // }, [session]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }
  // console.log("isAdmin from index", isAdmin);
  // // console.log("group from index", group);

  if (!isAdmin) {
    console.log("Not admin from index");
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={async () => await supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
