import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/components/useColorScheme";
import CartProvider from "../providers/CartProvider";
import AuthProvider from "../providers/AuthProvider";

// import { Provider } from "react-redux";
// import { store } from "../store/store";
import TanQueryProvider from "../providers/TanStackQueryProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* todo move it to redux  */}
        {/* <Provider store={store}> */}
        <AuthProvider>
          <TanQueryProvider>
            <CartProvider>
              <Stack
              // screenListeners={{
              //   state: e => {
              //     // Do something with the state
              //     console.log("state changed", e.data);
              //   }
              // }}
              >
                <Stack.Screen name="(admin)" options={{ headerShown: true }} />
                <Stack.Screen name="(user)" options={{ headerShown: true }} />

                <Stack.Screen name="(auth)" options={{ headerShown: false }} />

                <Stack.Screen name="cart" options={{ presentation: "modal" }} />
              </Stack>
            </CartProvider>
          </TanQueryProvider>
        </AuthProvider>
        {/* </Provider> */}
      </ThemeProvider>
    </>
  );
}
