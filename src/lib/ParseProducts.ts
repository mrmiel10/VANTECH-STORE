import { JsonValue } from "@prisma/client/runtime/library";
import { SchemaSafeProductsOrder } from "../../schemas/schema";

export const ParseProducts = (products: JsonValue) => {
    const stringProducts = products as string;
    return SchemaSafeProductsOrder.parse(
      JSON.parse(JSON.stringify(stringProducts))
    );
  };
  