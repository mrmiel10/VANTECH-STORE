 import { HandleFilterSearchParams } from "../ProductCard";
import React, { Suspense } from "react";
// import { ProductCard } from "../ProductCard";
// import { products } from "@/lib/products";

import prisma from "../../db";
import * as z from "zod";
//import { HandleFilterSearchParams } from "@/lib/HandleFilterSearchParams";
import { CardProduct } from "../ProductCard";
import { ToggleCartButton } from "../ProductCard";
import { ToggleLikeButton } from "../ProductCard";
import { unstable_noStore as noStore } from "next/cache"
export type typeFiltersSort = {
  price?: string;
  rating?: string;
  new?: string;
};
export type typeFilterByCategory = {
  category?: string;
};
const getData = async ({
  filtersByFeatures,
  filtersSort,
  filterByCategory,
  querySearch,
  category
}: {
  filtersByFeatures?: string[];
  filtersSort?: typeFiltersSort;
  filterByCategory?: typeFilterByCategory;
  querySearch?: string;
  category?:string
}) => {
  noStore()
  const datas = await prisma.product.findMany({
    where: {
      name:
        filtersByFeatures && filtersByFeatures?.length > 0
          ? {
              in: filtersByFeatures,
              mode: "insensitive",
            }
          : undefined,

      category: filterByCategory?.category
        ? {
            contains: filterByCategory.category,
            mode: "insensitive",
          }
        : category
        ? {
            contains: category,
            mode: "insensitive",
          }
        : undefined,
    },
   
    include: {
      reviews: true,
    },
    orderBy: {
      price: filtersSort?.price
        ? filtersSort.price === "asc"
          ? "asc"
          : "desc"
        : undefined,
    },
  });
  return datas
};
export const ShowItems = async ({
  searchParams,
  category,
}: {
  searchParams?: { [key: string]: string };
  category?: string;
}) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(searchParams);
  console.log(category);

  const { filtersByFeatures, filtersSort, filterByCategory, querySearch } =
    HandleFilterSearchParams(searchParams);

  console.log(filtersByFeatures);
  console.log(filtersSort);
  console.log(filterByCategory);
  console.log(querySearch);

  const products = await getData({
    filtersByFeatures,
    filtersSort,
    filterByCategory,
    querySearch,
    category
  });

  console.log(products);
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
