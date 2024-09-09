import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link, Stack, useRouter, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { CURRENCY_SYMBOL } from "@/src/config/general";
import { useCart } from "@/src/providers/CartProvider";
import Colors from "@/src/constants/Colors";

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

      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?productId=${product.id}`} asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="pencil" size={20} color={Colors.light.tint} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          )
        }}
      />

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
