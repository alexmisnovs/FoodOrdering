import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";

/**
 * The screen for viewing and managing items in the cart.
 *
 * This screen is currently just a placeholder, but it will eventually show the
 * items in the cart and allow the user to remove them.
 *
 * @returns The JSX element for the CartScreen component.
 */
const CartScreen = () => {
  const { items, total, checkout } = useCart();

  return (
    <View>
      <FlatList data={items} renderItem={({ item }) => <CartListItem cartItem={item} />} contentContainerStyle={{ gap: 10, padding: 10 }} />
      <Text>Total: ${total.toFixed(2)}</Text>
      <Button onPress={checkout} text="Checkout" />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
