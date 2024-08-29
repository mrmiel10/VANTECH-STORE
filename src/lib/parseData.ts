import { JsonValue } from "@prisma/client/runtime/library";
import { SchemaSafeImages, SchemaSafeProductsOrder } from "../../schemas/schema";

export const ParseProducts = (products: JsonValue) => {
    const stringProducts = products as string;
    return SchemaSafeProductsOrder.parse(
      JSON.parse(JSON.stringify(stringProducts))
    );
  };
  export const ParseProductImages = (images: JsonValue) => {
  
    const stringImages = images as string;
    return SchemaSafeImages.parse(JSON.parse(JSON.stringify(stringImages)));
  };
  