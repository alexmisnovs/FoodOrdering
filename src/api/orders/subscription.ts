import { supabase } from "@/src/config/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInserOrderSubsciption = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, payload => {
        //   console.log("Change received!", payload);
        // we could use the payload returned to manually update the UI, and in some cases that will be necessary

        queryClient.invalidateQueries({ queryKey: ["orders"] });

        // refetch();
      })
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);
};

export const useUpdateOrderSubsciption = (orderId: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `orderId=eq.${orderId}`
        },
        payload => {
          // refetch();
          queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
