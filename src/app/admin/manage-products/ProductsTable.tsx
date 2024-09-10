import { MobileProductsAdmin } from "../../../../components/admin/MobileProductsAdmin";
import { searchParamsCache } from "@/lib/utils";
import { ProductsTableAdmin } from "../../../../components/admin/ProductsTableAdmin";
import { getFilteredProducts } from "@/lib/actions";

export const ProductsTable = async () => {
  const currentPage = searchParamsCache.get("page");
  const searchProduct = searchParamsCache.get("search");
  const productStatus = searchParamsCache.get("status");
  console.log(`searchProduct:${searchProduct}`);
  const products = await getFilteredProducts(
    searchProduct,
    currentPage,
    productStatus
  );
  console.log(products);

  return (
    <>
      <MobileProductsAdmin products={products} />
      <ProductsTableAdmin products={products} />
    </>
  );
};

