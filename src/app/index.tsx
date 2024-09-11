import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "../config/supabase";

const index = () => {
  const { session, loading } = useAuth();
  // const router = useRouter();

  if (loading) return <Text>Loading...</Text>;

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const handleSignOut = () => {
    supabase.auth.signOut();
    // router.replace("/(auth)/sign-in");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Text style={{ textAlign: "center" }}>Welcome {session?.user?.email}</Text>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)/sign-in"} asChild>
        <Button text="Sign in" />
      </Link>

      <Button text="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default index;
