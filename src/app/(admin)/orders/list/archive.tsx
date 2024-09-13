import { View } from "@/src/components/Themed";
import { FlatList } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function MenuScreen() {
  // const product = products[1];
  //comment

  //filter orders by status
  const archivedOrders = orders.filter(order => order.status === "Delivered");

  console.log(archivedOrders);
  return <FlatList data={archivedOrders} renderItem={({ item }) => <OrderListItem order={item} />} numColumns={1} contentContainerStyle={{ gap: 10, padding: 10 }} />;
}
