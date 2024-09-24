import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import OrderListItem from "../../../components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderDetailsItem";
import { useOrderById } from "@/src/api/orders";

const OrderDetailScreen = () => {
  const { orderId } = useLocalSearchParams();

  const id = parseInt(typeof orderId === "string" ? orderId : orderId[0]);

  // turn order id into string

  const { data: order, error, isLoading } = useOrderById(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  if (!order) return <Text>No orders</Text>;
  if (!order.order_items) return <Text>No order items</Text>;

  console.log(order);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList data={order.order_items} renderItem={({ item }) => <OrderItemListItem item={item} />} contentContainerStyle={{ gap: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10
  }
});

export default OrderDetailScreen;
