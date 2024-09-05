import { useContext, createContext, PropsWithChildren, useState } from "react";
import { CartItem, Product } from "../types";

export interface iCart {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  removeItem: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<iCart>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    //todo check if item already exists in cart increment quantity
    if (items.some(item => item.product_id === product.id && item.size === size)) return;
    // generate new id for the cart item
    const newCartItem: CartItem = {
      id: Math.random().toString(),
      product,
      size,
      quantity: 1,
      product_id: product.id
    };

    setItems([newCartItem, ...items]);

    console.log(items);
  };

  const removeItem = (product: Product) => {
    console.log(product);
  };
  const updateQuantity = (id: string, quantity: number) => {
    console.log(id, quantity);
  };

  return <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity }}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider };
