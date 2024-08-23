import Shoe from "../../../../../public/blackShoe.jpg";
import Image from "next/image";
import { MobileProductsAdmin } from "./MobileProductsAdmin";
import { searchParamsCache } from "@/lib/nuqs";
import { ProductsTableAdmin } from "./ProductsTableAdmin";
import { getFilteredProducts } from "@/lib/actions";
import { JsonValue } from "@prisma/client/runtime/library";
import { SchemaSafeImages } from "../../schemas/schema";

export const ProductsTable = async () => {
  const currentPage = searchParamsCache.get("page");
  const searchProduct = searchParamsCache.get("search");
  const productStatus= searchParamsCache.get("status");
  console.log(`searchProduct:${searchProduct}`)
  const products = await getFilteredProducts(searchProduct, currentPage,productStatus);
  console.log(products);

  return (
    <>
      <MobileProductsAdmin products={products} />
      <ProductsTableAdmin products={products} />
    </>
  );
};

export const MapStatus = ["published", "draft", "archive"];
export const ParseImages = (images: JsonValue) => {
  
  const stringImages = images as string;
  return SchemaSafeImages.parse(JSON.parse(JSON.stringify(stringImages)));
};
