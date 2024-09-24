import { Database } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = ["NEW", "COOKING", "DELIVERING", "DELIVERED"];

export type OrderStatus = "NEW" | "COOKING" | "DELIVERING" | "DELIVERED";

// export type Order = {
//   id: number;
//   created_at: string;
//   total: number;
//   user_id: string;
//   status: OrderStatus;

//   order_items?: OrderItem[];
// };
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;

// export type OrderItem = {
//   id: number;
//   product_id: number;
//   products: Product | null; // temp fix
//   order_id: number;
//   size: PizzaSize | string; // temp fix since in the DB pizza size is a string
//   quantity: number;
// };

export type Profile = {
  id: string;
  group: string;
};

export type User = {
  id: string;
  email: string;
  profile: Profile;
};
