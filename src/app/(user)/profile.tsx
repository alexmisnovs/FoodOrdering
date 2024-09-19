import { StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { Text, View } from "@/src/components/Themed";
import Button from "@/src/components/Button";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/config/supabase";

export default function TabProfileScreen() {
  const { profile, session } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    console.log("signed out, navigating now..");
    router.push("/sign-in" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.title}>EMAIL:{session?.user.email}</Text>
      <Text style={styles.title}>Group: {profile?.group}</Text>
      <Button onPress={handleLogout} text="Sign out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
