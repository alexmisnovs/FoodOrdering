import { supabase } from "@/src/config/supabase";
import { Tables } from "@/src/database.types";
// import { Product } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      // I could override type it returns with .returns() function if I need to
      // const { data, error } = await supabase.from("products").select("*").returns<Product[]>();
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useProduct = (id: number) => {
  return useQuery<Tables<"products">>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      // make sure changes are reflected straight away
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error) {
      console.log(error);
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price
        })
        .eq("id", data.productId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { productId }) {
      // make sure changes are reflected straight away
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
    onError(error) {
      console.log(error);
    }
  });
};

export const useDeleteProduct = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      // make sure changes are reflected straight away

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error: any) {
      console.log(error);
    }
  });
};
