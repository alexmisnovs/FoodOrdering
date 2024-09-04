import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const ProductDetailScreen = () => {
  const { productId } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Product Detail " + productId }} />
      <Text>{productId}</Text>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

export default ProductDetailScreen;
