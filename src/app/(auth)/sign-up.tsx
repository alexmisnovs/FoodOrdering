import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";
import { useState } from "react";

import Button from "@/src/components/Button";

import Colors from "@/src/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";

import { register, validateEmail, validatePassword } from "@/src/helpers/auth";
import { AuthError } from "@supabase/supabase-js";

const SignUpScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  /**
   * Resets the form fields to their initial state.
   *
   */
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setconfrimPassword("");
    setErrors("");
  };

  //TODO: Move to helpers completely
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
    // disabled for now, for testing
    if (!validatePassword(password)) {
      setErrors("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confrimPassword) {
      setErrors("Passwords do not match");
      return false;
    }

    return true;
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    if (!validateInput()) {
      setLoading(false);
      return;
    }

    try {
      // const { error } = await supabase.auth.signUp({ email, password });
      const {
        error,
        data: { session }
      } = await register({ email, password });
      // if wrong credentials etc..
      if (error) {
        Alert.alert(error.message);
        setLoading(false);
        return;
      }
      // if (session) authenticate(session.access_token);
      // if API failed
    } catch (error: AuthError | any) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    // console.log(email, password, confrimPassword);

    Alert.alert("Success", "Check your email for the verification link");
    setLoading(false);
    resetForm();
    // redirect to the home page or sign
  };
  const checkSuggestedPassword = () => {
    if (password.length > 0) {
      setPassword("");
      Alert.alert("Suggested Password", "Your password is: " + password);
    }
    //maybe just clear it..
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
          <TextInput value={password} textContentType="oneTimeCode" onChangeText={setPassword} onFocus={checkSuggestedPassword} secureTextEntry={true} style={styles.input} />

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput value={confrimPassword} textContentType="oneTimeCode" onChangeText={setconfrimPassword} secureTextEntry={true} style={styles.input} />

          {/* Errors */}
          <Text style={styles.error}>{errors}</Text>

          <Button text={loading ? "Loading..." : "Register"} onPress={signUpWithEmail} style={loading ? { backgroundColor: "gray" } : {}} disabled={loading} />
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
