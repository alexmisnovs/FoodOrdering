import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { CURRENCY_SYMBOL } from "@/src/config/general";
import Button from "@/src/components/Button";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");

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
    <View style={styles.container}>
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
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    alignItems: "center"
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20
  },
  label: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 20
  },
  error: {
    color: "red"
  }
});
