import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CURRENCY_SYMBOL, defaultPizzaImage } from "@/src/config/general";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";

const ProductDetailScreen = () => {
  const { productId } = useLocalSearchParams();
  //find products in the dummy file
  const { data: product, isLoading, error } = useProduct(parseInt(typeof productId === "string" ? productId : productId[0]));

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
