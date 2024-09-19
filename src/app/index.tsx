import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../config/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  console.log("loading from index", loading);
  console.log("session user from index", session?.user);
  console.log("isAdmin from index", isAdmin);

  const [show, setShow] = useState(false);

  // stop login screen flickering
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [show]);

  if (!show) return null;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
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
