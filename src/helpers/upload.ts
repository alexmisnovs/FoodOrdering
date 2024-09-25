import { randomUUID } from "expo-crypto";
import { supabase } from "../config/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export const uploadImage = async (image: any) => {
  if (!image?.startsWith("file://")) {
    return;
  }

  const base64 = await FileSystem.readAsStringAsync(image, {
    encoding: "base64"
  });
  const filePath = `${randomUUID()}.png`;
  const contentType = "image/png";
  const { data, error } = await supabase.storage.from("product-images").upload(filePath, decode(base64), { contentType });

  if (data) {
    console.log("Uploaded", data.path);
    return data.path;
  }

  if (error) {
    console.log(error); // error;
  }
};
