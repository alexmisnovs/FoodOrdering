import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { useState } from "react";

import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { CURRENCY_SYMBOL, PIZZA_SIZES } from "@/src/config/general";
import Button from "@/src/components/Button";

const ProductDetailScreen = () => {
  // get product from the router
  const { productId } = useLocalSearchParams();
  //find products in the dummy file
  const product = products.find(p => p.id.toString() === productId);

  const [selectedSize, setSelectedSize] = useState<string>("M");

  const addToCart = () => {
    console.warn("Add to cart :  " + selectedSize);
  };

  // check if product exists first
  if (!product) return <Text>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>
        {CURRENCY_SYMBOL}
        {product.price}
      </Text>
      <Text>Select Size:</Text>
      {/* todo: move the sizes into its own component */}
      <View style={styles.sizes}>
        {PIZZA_SIZES.map(size => (
          <Pressable onPress={() => setSelectedSize(size)} style={[styles.size, { backgroundColor: selectedSize === size ? "gainsboro" : "white " }]} key={size}>
            <Text style={[styles.sizeText, { color: selectedSize === size ? "white" : "gainsboro" }]} key={size}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10
  },
  title: {},
  image: { width: "100%", aspectRatio: 1 },
  price: {},
  sizes: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  size: { alignItems: "center", justifyContent: "center", width: 50, margin: 5, backgroundColor: "lightgray", padding: 10, borderRadius: 25 },
  sizeText: { fontSize: 20, fontWeight: 500 }
});

export default ProductDetailScreen;
