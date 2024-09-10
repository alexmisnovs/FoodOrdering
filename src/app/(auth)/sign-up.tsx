import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useState } from "react";

import Button from "@/src/components/Button";

import Colors from "@/src/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";

import { validateEmail, validatePassword } from "@/src/helpers/auth";

const SignUpScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");
  const [errors, setErrors] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setconfrimPassword("");
    setErrors("");
  };
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
    if (!confrimPassword) {
      setErrors("Confirm password is missing");
      return false;
    }
    //disabled for now, for testing
    // if (!validatePassword(password)) {
    //   setErrors("Password must be at least 8 characters long");
    //   return false;
    // }
    if (password !== confrimPassword) {
      setErrors("Passwords do not match");
      return false;
    }

    return true;
  };

  const onSignIn = () => {
    if (!validateInput()) {
      return;
    }

    // save to the database
    console.log(email, password, confrimPassword);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: "Register" }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}>
        <View style={styles.container}>
          {/* Email */}
          <Text style={styles.label}>Email </Text>
          <TextInput keyboardType="email-address" textContentType={"emailAddress"} autoCapitalize="none" autoCorrect={false} value={email} onChangeText={setEmail} returnKeyType="next" autoFocus={true} style={styles.input} />
          {/* Password */}
          <Text style={styles.small}>Note to self: Don't use password auths</Text>

          <Text style={styles.label}>Password</Text>
          <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput value={confrimPassword} onChangeText={setconfrimPassword} secureTextEntry={true} style={styles.input} />

          {/* Errors */}
          <Text style={styles.error}>{errors}</Text>

          <Button text="Register" onPress={onSignIn} />
          <Link href={"/(auth)/sign-in/" as any} asChild>
            <Text style={styles.textButton}>Don't have an account? Sign up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUpScreen;

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
  small: {
    fontSize: 10
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
