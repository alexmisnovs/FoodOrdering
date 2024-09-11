import { View, Text, ActivityIndicator, Alert } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../config/supabase";

const index = () => {
  const { session, loading, profile } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }
  // lets try to fech the profile

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  // ok lets now do the admin check
  // @ts-ignore
  const isAdmin = profile?.group === "ADMIN";

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

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
