import { StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { Product } from "@/types";
import { Link } from "expo-router";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  //todo: add image placeholder if no image is found
  if (!product.image) product.image = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "50%",
    // margin: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20
  },

  image: {
    width: "100%",
    aspectRatio: 1
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold"
  }
});
