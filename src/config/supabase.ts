import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import Constants from "expo-constants";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  }
};

let supabaseUrl: string;

// FOR DEV ONLY
if (process.env.EXPO_PUBLIC_ENV === "dev") {
  console.log("I am IN DEV MODE");
  const origin = (Constants?.expoConfig as unknown as { hostUri?: string })?.hostUri?.split(":").shift();

  if (!origin) throw new Error("Could not determine origin");

  supabaseUrl = `http://${origin}:54321`;
} else {
  supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
}

const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
