import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";
import { useState } from "react";

import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Stack } from "expo-router";
import { login, validateEmail } from "@/src/helpers/auth";

import { AuthError } from "@supabase/supabase-js";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors("");
  };

  //check if session already exists, if yes - redirect

  const validateInput = (): boolean => {
    setErrors("");

    if (!email) {
      setErrors("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      setErrors("Must be a valid email");
      return false;
    }
    if (!password) {
      setErrors("Password is missing");
      return false;
    }

    return true;
  };
  const signInWithEmail = async () => {
    setLoading(true);

    if (!validateInput()) {
      setLoading(false);
      return;
    }

    try {
      const {
        error,
        data: { session }
      } = await login({ email, password });

      if (error) {
        Alert.alert(error.message);
        setLoading(false);
        return;
      }
    } catch (error: AuthError | any) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: "Sign in" }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
        <View style={styles.container}>
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput keyboardType="email-address" textContentType={"emailAddress"} autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} returnKeyType="next" autoFocus={true} style={styles.input} />
          {/* Pass */}
          <Text style={styles.label}>Passowrd</Text>
          <TextInput value={password} onChangeText={setPassword} textContentType="oneTimeCode" secureTextEntry returnKeyType="go" style={styles.input} />
          {/* Errors */}
          <Text style={styles.error}>{errors}</Text>

          <Button text={loading ? "Loading..." : "Sign In"} onPress={signInWithEmail} disabled={loading} />

          <Link href={"/(auth)/sign-up/" as any} asChild>
            <Text style={styles.textButton}>Don't have an account? Sign up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  scrollContent: {
    justifyContent: "center"
  },
  container: {
    flex: 1,
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5
  },
  label: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 20
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center"
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10
  },
  error: {
    color: "red"
  }
});
