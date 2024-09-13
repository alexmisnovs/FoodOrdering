import { StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { supabase } from "@/src/config/supabase";
import Button from "@/src/components/Button";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "expo-router";

export default function TabTwoScreen() {
  const { profile, session } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleSignOut} text="Sign out" />
      <Text style={styles.title}>Tab Two</Text>
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
