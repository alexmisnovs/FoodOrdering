import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import orders from "@/assets/data/orders";
import { CURRENCY_SYMBOL, PIZZA_SIZES } from "@/src/config/general";
import Button from "@/src/components/Button";

const OrderDetailScreen = () => {
  // get order from the router
  const { orderId } = useLocalSearchParams();
  //find orders in the dummy file
  const order = orders.find(p => p.id.toString() === orderId);

  // check if order exists first
  if (!order) return <Text>order not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: order.id.toString() }} />

      <Text style={styles.title}>{order.status}</Text>
      <Text style={styles.price}>
        {CURRENCY_SYMBOL}
        {order.total}
      </Text>
      <Text>Select Size:</Text>
      {/* todo: move the sizes into its own component */}
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

export default OrderDetailScreen;
