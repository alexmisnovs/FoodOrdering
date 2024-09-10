import { View } from "@/src/components/Themed";
import { FlatList } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function MenuScreen() {
  // const product = products[1];
  //comment

  return <FlatList data={orders} renderItem={({ item }) => <OrderListItem order={item} />} numColumns={1} contentContainerStyle={{ gap: 10, padding: 10 }} />;
}
