import { View } from "@/src/components/Themed";
import { FlatList } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function MenuScreen() {
  // const product = products[1];
  //comment
  const activeOrders = orders.filter(order => order.status !== "Delivered");
  return <FlatList data={activeOrders} renderItem={({ item }) => <OrderListItem order={item} />} numColumns={1} contentContainerStyle={{ gap: 10, padding: 10 }} />;
}
