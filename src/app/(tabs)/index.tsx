import { StyleSheet, Image } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";

import Colors from "@/src/constants/Colors";
import products from "../../../assets/data/products";

export default function TabOneScreen() {
  const product = products[0];

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tabIconDefault,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: Colors.light.text
  },
  price: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "bold"
  }
});
