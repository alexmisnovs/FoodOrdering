import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
// import orders from "../../../../assets/data/orders";

import OrderListItem from "../../../components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderDetailsItem";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetailsById } from "@/src/api/orders";
// import OrderItemListItem from "@/src/components/OrderDetailsItem";

const OrderDetailScreen = () => {
  const { orderId } = useLocalSearchParams();

  const id = parseInt(typeof orderId === "string" ? orderId : orderId[0]);

  // turn order id into string

  const { data: order, error, isLoading } = useOrderDetailsById(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  if (!order) return <Text>No orders</Text>;
  if (order.order_items.length < 1) return <Text>No order items</Text>;

  console.log(order);
  console.log("Order items", order.order_items);

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map(status => (
                <Pressable
                  key={status}
                  // onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor: order.status === status ? Colors.light.tint : "transparent"
                  }}
                >
                  <Text
                    style={{
                      color: order.status === status ? "white" : Colors.light.tint
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
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
