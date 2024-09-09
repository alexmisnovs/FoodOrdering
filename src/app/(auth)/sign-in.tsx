import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useState } from "react";

import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";

const SignInScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors("");
  };

  const validateInput = (): boolean => {
    setErrors("");

    if (!email) {
      setErrors("Name is required");
      return false;
    }
    if (!password) {
      setErrors("Price is required");
      return false;
    }

    return true;
  };

  const onSignIn = () => {
    if (!validateInput()) {
      return;
    }

    // save to the database
    console.warn(email, password);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: "Sign in" }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
        <View style={styles.container}>
          {/* Name input field */}
          <Text style={styles.label}>Email</Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Name" />
          {/* Price */}
          <Text style={styles.label}>Passowrd</Text>
          <TextInput value={password} onChangeText={setPassword} keyboardType="numeric" style={styles.input} placeholder="9.99" />
          {/* Errors */}
          <Text style={styles.error}>{errors}</Text>

          <Button text="Sign In" onPress={onSignIn} />

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
