import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";

import { CURRENCY_SYMBOL, defaultPizzaImage } from "@/src/config/general";
import Button from "@/src/components/Button";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";
import { uploadImage } from "@/src/helpers/upload";
import RemoteImage from "@/src/components/RemoteImage";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { productId: idString } = useLocalSearchParams();

  let productId: number;

  if (!idString) {
    // no id passed - means we are creating.
    productId = 0;
  } else {
    productId = parseFloat(typeof idString === "string" ? idString : idString[0]);
  }

  const isUpdating = !!productId;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(productId);
  const { mutate: deleteProduct } = useDeleteProduct(productId);

  const router = useRouter();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("image pick result");
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

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

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage(image);
    // save to the database
    console.log(name, price);
    insertProduct(
      {
        name,
        price: parseFloat(price),
        image: imagePath,
      },
      {
        onSuccess: () => {
          resetForm();
          router.back();
        },
      }
    );
    // resetForm();
  };

  const onUpdate = async () => {
    if (!validateInput()) {
      return;
    }
    const imagePath = await uploadImage(image);
    updateProduct(
      {
        productId,
        name,
        price: parseFloat(price),
        image: imagePath,
      },
      {
        onSuccess: () => {
          resetForm();
          router.back();
        },
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => {
        resetForm();
        router.replace("/(admin)");
      },
      onError(error) {
        console.log(error);
      },
    });
    console.warn("Deleting product");
  };
  const confirmDelete = () => {
    Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product" }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={styles.container}>
          {/* <RemoteImage path={image} fallback={defaultPizzaImage} style={styles.image} /> */}
          <Image
            source={{ uri: image || defaultPizzaImage }}
            style={styles.image}
            resizeMode="contain"
          />

          <Text onPress={pickImage} style={styles.textButton}>
            Select Image
          </Text>

          {/* Name input field */}
          <Text style={styles.label}>Product Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Name" />
          {/* Price */}
          <Text style={styles.label}>Price ({CURRENCY_SYMBOL})</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
            placeholder="9.99"
          />
          {/* Errors */}
          <Text style={styles.error}>{errors}</Text>

          <Button text={isUpdating ? "Update Product" : "Create Product"} onPress={onSubmit} />
          {isUpdating && (
            <Text onPress={confirmDelete} style={styles.textButton}>
              Delete Product
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  scrollContent: {
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  label: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  error: {
    color: "red",
  },
});
