import { ActivityIndicator, FlatList, Text } from "react-native";

import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

import { useInserOrderSubsciption } from "@/src/api/orders/subscription";

export default function MenuScreen() {
  useInserOrderSubsciption();

  const { data: orders, error, isLoading } = useAdminOrderList({ archived: false });
  // const product = products[1];
  //comment
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  if (!orders) return <Text>No orders</Text>;

  return <FlatList data={orders} renderItem={({ item }) => <OrderListItem order={item} />} numColumns={1} contentContainerStyle={{ gap: 10, padding: 10 }} />;
}
