import { useContext, createContext, PropsWithChildren, useState } from "react";
import { InsertTables, type CartItem, type Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInserOrderItems } from "../api/order_items";

type Product = Tables<"products">;

export interface iCart {
  items: CartItem[];
  total: number;
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: 1 | -1) => void;
  checkout: () => void;
}

const CartContext = createContext<iCart>({
  items: [],
  total: 0,
  addItem: () => {},
  updateQuantity: () => {},
  checkout: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInserOrderItems();

  const router = useRouter();
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

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: addOrderItems,
        onError: () => {
          console.error("Error creating order");
        }
      }
    );
    // console.warn("Checkout");
  };

  const addOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map(cartItem => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size
    }));

    insertOrderItems(
      orderItems,

      {
        onSuccess() {
          clearCart();
          router.push(`/(user)/orders/${order.id}`);
        }
      }
    );
  };

  return <CartContext.Provider value={{ items, total, addItem, updateQuantity, checkout }}>{children}</CartContext.Provider>;
};
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
