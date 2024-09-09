import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";
import { useState } from "react";

import { CURRENCY_SYMBOL } from "@/src/config/general";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";

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

  const passwordsMatch = password === confrimPassword;

  const validateInput = (): boolean => {
    setErrors("");

    if (!email) {
      setErrors("Email is required");
      return false;
    }
    if (!password) {
      setErrors("Password is missing");
      return false;
    }
    if (!passwordsMatch) {
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
    console.log(email, password);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: "Register" }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}>
        <View style={styles.container}>
          {/* Name input field */}
          <Text style={styles.label}>Email </Text>
          <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" />
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
