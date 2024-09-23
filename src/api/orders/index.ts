import { supabase } from "@/src/config/supabase";
import { Tables } from "@/src/database.types";
import { useAuth } from "@/src/providers/AuthProvider";
// import { Product } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = () => {
  return useQuery({
    queryKey: ["orders"],

    queryFn: async () => {
      // I could override type it returns with .returns() function if I need to
      // const { data, error } = await supabase.from("orders").select("*").returns<Product[]>();
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
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
      const { data, error } = await supabase.from("orders").select("*").eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useOrder = (id: number) => {
  return useQuery<Tables<"orders">>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

// export const useInsertProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn(data: any) {
//       const { data: newProduct, error } = await supabase
//         .from("orders")
//         .insert({
//           name: data.name,
//           image: data.image,
//           price: data.price
//         })
//         .single();
//       if (error) {
//         throw new Error(error.message);
//       }
//       return newProduct;
//     },
//     async onSuccess() {
//       // make sure changes are reflected straight away
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     },
//     onError(error) {
//       console.log(error);
//     }
//   });
// };

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
