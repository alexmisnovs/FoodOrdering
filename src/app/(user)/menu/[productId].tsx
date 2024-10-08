import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { useState } from "react";

// import products from "@/assets/data/products";

import { CURRENCY_SYMBOL, defaultPizzaImage, PIZZA_SIZES } from "@/src/config/general";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { useProduct } from "@/src/api/products";
import RemoteImage from "@/src/components/RemoteImage";
const ProductDetailScreen = () => {
  const router = useRouter();
  // get product from the router
  const { productId } = useLocalSearchParams();
  const { data: product, isLoading, error } = useProduct(parseInt(typeof productId === "string" ? productId : productId[0]));

  //find products in the dummy file
  // const product = products.find(p => p.id.toString() === productId);

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  // get cart
  const { addItem } = useCart();

  // add item to cart
  const addToCart = () => {
    console.warn("Add to cart :  " + selectedSize);
    if (!product) return;
    addItem(product, selectedSize);

    //navigate to cart
    router.push("/cart");
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <RemoteImage path={product?.image} fallback={defaultPizzaImage} style={styles.image} />
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
