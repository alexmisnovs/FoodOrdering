import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useState } from "react";
import { CURRENCY_SYMBOL } from "@/src/config/general";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setErrors("");
  };

  const validateInput = (): boolean => {
    setErrors("");

    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price must be a number");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    // save to the database
    console.log(name, price);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: "Create Product" }} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
        <View style={styles.container}>
          <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
          <Text onPress={pickImage} style={styles.textButton}>
            Select Image
          </Text>

          {/* Name input field */}
          <Text style={styles.label}>Product Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" />
          {/* Price */}
          <Text style={styles.label}>Price ({CURRENCY_SYMBOL})</Text>
          <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} placeholder="9.99" />
          {/* Errors */}
          <Text style={styles.error}>{errors}</Text>

          <Button text="Create" onPress={onCreate} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateProductScreen;

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
