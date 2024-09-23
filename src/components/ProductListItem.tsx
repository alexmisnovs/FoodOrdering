import { StyleSheet, Image, Pressable } from "react-native";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { Tables } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { CURRENCY_SYMBOL, defaultPizzaImage } from "../config/general";

type ProductListItemProps = {
  product: Tables<"products">;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  //todo: add image placeholder if no image is found
  if (!product.image) product.image = defaultPizzaImage;

  // to understand are we on user or admin side (user) or (admin)
  const segments = useSegments();
  // console.log(segments);

  return (
    <Link href={`/${segments[0]}/menu/${product.id}` as any} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>
          {CURRENCY_SYMBOL}
          {product.price}
        </Text>
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
