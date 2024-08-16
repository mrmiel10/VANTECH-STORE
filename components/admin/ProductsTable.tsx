import Shoe from "../../../../../public/blackShoe.jpg";
import Image from "next/image";
import { MobileProductsAdmin } from "./MobileProductsAdmin";

import { Prisma } from "@prisma/client";

import { formatPrice } from "@/lib/formatPrice";
import * as z from "zod";

import { searchParamsCache } from "@/lib/nuqs";

import { toast } from "sonner";

import { ProductsTableAdmin } from "./ProductsTableAdmin";
import { getFilteredProducts } from "@/lib/actions";
// const getData = async (query: string) => {
//   noStore();
//   const datas = await prisma.product.findMany({
//     include: {
//       reviews: true,
//     },
//     where: {
//       OR: [
//         {
//           name: query
//             ? {
//                 contains: query,
//                 mode: "insensitive",
//               }
//             : undefined,
//         },
//         {
//           description: query
//             ? {
//                 contains: query,
//                 mode: "insensitive",
//               }
//             : undefined,
//         },
//         {
//           category: query
//             ? {
//                 contains: query,
//                 mode: "insensitive",
//               }
//             : undefined,
//         },
//         {
//           brand: query
//             ? {
//                 contains: query,
//                 mode: "insensitive",
//               }
//             : undefined,
//         },
//         {
//           status: query
//             ? {
//                 contains: query,
//                 mode: "insensitive",
//               }
//             : undefined,
//         },
//         {
//           price:
//             query && Number(query)
//               ? {
//                   equals: Number(query),
//                 }
//               : undefined,
//         },
//       ],
//     },
//   });
//   return datas;
// };
export const ProductsTable = async () => {
  const currentPage = searchParamsCache.get("page");
  const searchProduct = searchParamsCache.get("searchProduct");
  const products = await getFilteredProducts(searchProduct, currentPage);
  console.log(products);

  // for (const product of products) {
  //   console.log(parseImages(product.images)[0].image);
  // }

  return (
    <>
      <MobileProductsAdmin products={products} />
      <ProductsTableAdmin products={products} />
    </>
  );
};

export const MapStatus = ["active", "draft", "archive"];
export const ParseImages = (images: any) => {
  const safeImages: { image: string }[] = JSON.parse(
    JSON.stringify(images as string)
  );
  return safeImages;
};
