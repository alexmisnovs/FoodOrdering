import { Pressable, StyleSheet, Text, View } from "react-native";
import { Order } from "../types";
import { Link, useSegments } from "expo-router";
import Colors from "../constants/Colors";
import { CURRENCY_SYMBOL } from "../config/general";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//todo: create helper functions for dates
dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  // const readableDate = dayjs(order.created_at).format("MMM D, YYYY h:mm A");
  const relativeTime = dayjs(order.created_at).fromNow();

  return (
    <Link href={`/${segments[0]}/orders/${order.id}` as any} asChild>
      <Pressable style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Order: {order.id}</Text>
          {/* Format total to 2 decimals  */}
          <Text style={styles.price}>
            Total: {CURRENCY_SYMBOL}
            {order.total.toFixed(2)}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.orderStatus}>{order.status}</Text>
          <Text style={styles.time}>{relativeTime}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    maxWidth: "100%",
    // margin: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  orderStatus: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10
  },
  time: {
    textAlign: "right",
    color: Colors.light.tint
  },

  title: {
    fontSize: 18,
    fontWeight: "400",
    marginVertical: 2
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold"
  }
});
