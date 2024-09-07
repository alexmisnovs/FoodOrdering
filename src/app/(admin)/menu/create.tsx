import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { CURRENCY_SYMBOL } from "@/src/config/general";
import Button from "@/src/components/Button";

const CreateProductScreen = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const resetForm = () => {
    setName("");
    setPrice("");
  };

  const onCreate = () => {
    // TODO form validation
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
  }
});
