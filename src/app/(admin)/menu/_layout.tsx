import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/constants/Colors";

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="plus-circle" size={20} color={Colors.light.tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          )
        }}
      />

      <Stack.Screen
        name="[productId]"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/cart" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="pencil" size={20} color={Colors.light.tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          )
        }}
      />
    </Stack>
  );
}
