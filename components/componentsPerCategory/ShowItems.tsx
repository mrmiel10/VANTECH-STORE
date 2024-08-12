
<<<<<<< Updated upstream
const ShowItems = async ({
    searchParams,
    category,
  }: {
    searchParams?: { [key: string]: string };
    category?:string
  }) => {
     // await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(searchParams);
  
    const { filtersByFeatures, filtersSort, filterByCategory } =
      handleFilterSearchParams(searchParams);
      console.log(filtersByFeatures);
      console.log(filtersSort);
      console.log(filterByCategory);
    return (
      // <Suspense  fallback={<SkeletonProductsCards />}>
        <ProductCard products={products} />
    //   </Suspense>
     );
  };
  export default ShowItems
  
=======
import { handleFilterSearchParams } from "@/lib/handleFiltersSearchparams";
import React, { Suspense } from "react";
// import { ProductCard } from "../ProductCard";
import { products } from '@/lib/products';

import prisma from "../../db";
import * as z from "zod";
// import { PropsWithChildren } from "react";
// import Image from "next/image";
// import { Heart, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { truncateText } from "@/lib/truncate";
// import { useRouter } from "next/navigation";
// import { productsType } from "@/lib/typeProducts";
// import { useCartStore } from "@/lib/cart.store";
// import { useState } from "react";
// import { useShallow } from "zustand/react/shallow";
// import clsx from "clsx";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Product } from "@prisma/client";
// import { Review } from "@prisma/client";
 import { CardProduct } from "../ProductCard";
import { ToggleCartButton } from "../ProductCard";
import { ToggleLikeButton } from "../ProductCard";
export const ShowItems = async ({
  searchParams,
  category,
}: {
  searchParams?: { [key: string]: string };
  category?: string;
}) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(searchParams);
  console.log(category)

  const { filtersByFeatures, filtersSort, filterByCategory,querySearch } =
    handleFilterSearchParams(searchParams);


  console.log(Object.values(filtersByFeatures));
  console.log(filtersSort);
  console.log(filterByCategory);
  let tabByFeatures = Object.values(filtersByFeatures);
  // const products = await prisma.product.findMany({
  //   include:{
  //     reviews:true
  //   }
  // })
  const products = await prisma.product.findMany({
    where: {
      // OR: [
      //  {
          name:
            tabByFeatures.length > 0
              ? {
                  in: tabByFeatures,
                  mode: "insensitive",
                }
              : undefined,
     //   },
     //   {
          // description:
          //   tabByFeatures.length > 0
          //     ? {
          //         in: tabByFeatures,
          //         mode: "insensitive",
          //       }
          //     : undefined,
     //   },
      // ],
      category: filterByCategory.category
        ? {
            contains: filterByCategory.category,
            mode: "insensitive",
          }
        : category ? {
          contains: category,
          mode: "insensitive",
        } : undefined,
    },
    // select: {
    //   id: true,
    //   name: true,
    //   description: true,
    //   price: true,
    //   brand: true,
    //   category: true,
    //   status: true,
    //   images: true,
    //   reviews: true,
    // },
include:{
  reviews:true
},
    orderBy: {
      price: filtersSort.price
        ? filtersSort.price === "asc"
          ? "asc"
          : "desc"
        : undefined,
      // reviews: {
      //   _count: filtersSort.rating
      //     ? filtersSort.rating === "asc"
      //       ? "asc"
      //       : "desc"
      //     : undefined,
      // },
    },
  });
  console.log(products)
  return (
    //  <ProductCard products={products} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-6">
      {products.map((product, index) => (
        <CardProduct key={index} {...product}>
          <ToggleLikeButton product={product} />
          <ToggleCartButton product={product} />
        </CardProduct>
      ))}
    </div>
  );
};
;
>>>>>>> Stashed changes
