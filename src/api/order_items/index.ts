import { supabase } from "@/src/config/supabase";
import { InsertTables } from "@/src/types";

// import { Product } from "@/src/types";
import { useMutation } from "@tanstack/react-query";

export const useInserOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { data: newOrderItems, error } = await supabase.from("order_items").insert(items).select();
      if (error) {
        throw new Error(error.message);
      }
      return newOrderItems;
    }
  });
};
