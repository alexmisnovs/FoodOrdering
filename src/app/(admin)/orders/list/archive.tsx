import { Text } from "@/src/components/Themed";
import { ActivityIndicator, FlatList } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

export default function MenuScreen() {
  const { data: archivedOrders, error, isLoading } = useAdminOrderList({ archived: true });
  // const product = products[1];
  //comment
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }
  if (!orders) return <Text>No orders</Text>;
  return <FlatList data={archivedOrders} renderItem={({ item }) => <OrderListItem order={item} />} numColumns={1} contentContainerStyle={{ gap: 10, padding: 10 }} />;
}
