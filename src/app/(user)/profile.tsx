import { StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { supabase } from "@/src/config/supabase";
import Button from "@/src/components/Button";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function TabProfileScreen() {
  const { session, profile } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.title}>{session?.user.email}</Text>
      <Text style={styles.title}>{profile?.group}</Text>
      <Button onPress={handleSignOut} text="Sign out" />
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
