import { StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { supabase } from "@/src/config/supabase";
import Button from "@/src/components/Button";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "expo-router";
import { signOut } from "@/src/helpers/auth";

export default function TabTwoScreen() {
  const { profile, session } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();

    console.log("signed out, navigating now..");
    router.replace("/" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.title}>{session?.user.email}</Text>
      <Text style={styles.title}>{profile?.group}</Text>
      <Button onPress={handleLogout} text="Sign out" />

      <Text style={styles.title}>Tab Two Admin Version</Text>
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
