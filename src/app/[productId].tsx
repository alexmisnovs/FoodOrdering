import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProductDetailScreen = () => {
  const { productId } = useLocalSearchParams();

  return (
    <View>
      <Text>{productId}</Text>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

export default ProductDetailScreen;
