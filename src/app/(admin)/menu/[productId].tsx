import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { CURRENCY_SYMBOL, PIZZA_SIZES } from "@/src/config/general";
import { useCart } from "@/src/providers/CartProvider";

const ProductDetailScreen = () => {
  const router = useRouter();
  // get product from the router
  const { productId } = useLocalSearchParams();
  //find products in the dummy file
  const product = products.find(p => p.id.toString() === productId);

  // get cart
  const { addItem } = useCart();

  // add item to cart

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

      {/* <Button onPress={addToCart} text="Add to Cart" /> */}
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
  price: {}
});

export default ProductDetailScreen;
