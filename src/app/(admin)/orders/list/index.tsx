import { ActivityIndicator, FlatList, Text } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

export default function MenuScreen() {
  const { data: orders, error, isLoading } = useAdminOrderList();
  // const product = products[1];
  //comment
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  if (!orders) return <Text>No orders</Text>;

  const activeOrders = orders.filter(order => order.status !== "Delivered");
  return <FlatList data={activeOrders} renderItem={({ item }) => <OrderListItem order={item} />} numColumns={1} contentContainerStyle={{ gap: 10, padding: 10 }} />;
}
