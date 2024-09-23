import { useContext, createContext, PropsWithChildren, useState } from "react";
import { type CartItem, type Tables } from "../types";
import { randomUUID } from "expo-crypto";

type Product = Tables<"products">;

export interface iCart {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: 1 | -1) => void;
}

const CartContext = createContext<iCart>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    //todo check if item already exists in cart increment quantity

    const existingItem = items.find(item => item.product_id === product.id && item.size === size);

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    // generate new id for the cart item
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      size,
      quantity: 1,
      product_id: product.id
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    const updatedItems = items.map(item => (item.id !== itemId ? item : { ...item, quantity: item.quantity + amount })).filter(item => item.quantity > 0);

    setItems(updatedItems);

    const item = items.find(item => item.id === itemId);
    if (!item) return;

    // console.log(itemId, amount);
  };

  return <CartContext.Provider value={{ items, addItem, updateQuantity }}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
