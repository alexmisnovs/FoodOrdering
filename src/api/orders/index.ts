import { supabase } from "@/src/config/supabase";
import { Tables, OrderStatus, InsertTables } from "@/src/types";
import { useAuth } from "@/src/providers/AuthProvider";
// import { Product } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const queryClient = useQueryClient();

export const useAdminOrderList = ({ archived = false }: { archived: boolean }) => {
  const statuses: OrderStatus[] = archived ? ["DELIVERED"] : ["NEW", "COOKING", "DELIVERING"];

  return useQuery({
    queryKey: ["orders", archived],

    queryFn: async () => {
      // I could override type it returns with .returns() function if I need to
      // const { data, error } = await supabase.from("orders").select("*").returns<Product[]>();
      const { data: orders, error } = await supabase.from("orders").select("*").in("status", statuses).order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return orders;
    }
  });
};
export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  return useQuery({
    queryKey: ["orders", { userId: id }],

    queryFn: async () => {
      if (!id) return null;
      // I could override type it returns with .returns() function if I need to
      // const { data, error } = await supabase.from("orders").select("*").returns<Product[]>();
      const { data, error } = await supabase.from("orders").select("*").eq("user_id", id).order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useOrderDetailsById = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*, order_items(*, products(*))").eq("id", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId, status: "NEW" })
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },
    async onSuccess() {
      // make sure changes are reflected straight away
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError(error) {
      console.log(error);
    }
  });
};

// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn(data: any) {
//       const { data: updatedProduct, error } = await supabase
//         .from("orders")
//         .update({
//           name: data.name,
//           image: data.image,
//           price: data.price
//         })
//         .eq("id", data.productId)
//         .single();
//       if (error) {
//         throw new Error(error.message);
//       }
//       return updatedProduct;
//     },
//     async onSuccess(_, { productId }) {
//       // make sure changes are reflected straight away
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//       queryClient.invalidateQueries({ queryKey: ["product", productId] });
//     },
//     onError(error) {
//       console.log(error);
//     }
//   });
// };

// export const useDeleteProduct = (id: number) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn(id: number) {
//       const { error } = await supabase.from("orders").delete().eq("id", id);
//       if (error) {
//         throw new Error(error.message);
//       }
//     },
//     async onSuccess() {
//       // make sure changes are reflected straight away

//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     },
//     onError(error: any) {
//       console.log(error);
//     }
//   });
// };
