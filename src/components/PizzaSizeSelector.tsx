import { StyleSheet, Text, View, Pressable } from "react-native";
import { PIZZA_SIZES } from "@/src/config/general";
import { useState } from "react";

const PizzaSizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState<string>("M");

  return (
    <View style={styles.sizes}>
      {PIZZA_SIZES.map(size => (
        <Pressable onPress={() => setSelectedSize(size)} style={[styles.size, { backgroundColor: selectedSize === size ? "gainsboro" : "white " }]} key={size}>
          <Text style={[styles.sizeText, { color: selectedSize === size ? "white" : "gainsboro" }]} key={size}>
            {size}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default PizzaSizeSelector;

const styles = StyleSheet.create({
  sizes: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  size: { alignItems: "center", justifyContent: "center", width: 50, margin: 5, backgroundColor: "lightgray", padding: 10, borderRadius: 25 },
  sizeText: { fontSize: 20, fontWeight: 500 }
});
