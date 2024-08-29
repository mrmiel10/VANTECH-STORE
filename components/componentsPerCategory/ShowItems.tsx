
import React, { Suspense } from "react";
// import { ProductCard } from "../ProductCard";
// import { products } from "@/lib/products";
import { handleFilterSearchParams } from "@/lib/handleFilterSearchParams";
import prisma from "../../db";
import * as z from "zod";
import { CardProduct } from "../ProductCard";
import { ToggleCartButton } from "../ProductCard";
import { ToggleLikeButton } from "../ProductCard";
import { unstable_noStore as noStore } from "next/cache";
import { Product, Review } from "@prisma/client";
import searchProduct from "../../public/searchProduct.png"
import Image from "next/image";

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
  category,
}: {
  filtersByFeatures?: string[];
  filtersSort?: typeFiltersSort;
  filterByCategory?: typeFilterByCategory;
  querySearch?: string;
  category?: string;
}) => {

  noStore();
  console.log(filtersByFeatures);
  
   const datas = await prisma.product.findMany({
    where: {
      name: querySearch
        ? { contains: querySearch, mode: "insensitive" }
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
 
  if (filtersByFeatures && filtersByFeatures.length != 0) {
    const dataFiltersByFeatures: (Product & { reviews: Review[] })[] = [];
    datas.map((product, _) =>
      product.name
        .split(" ")
        .map(
          (stringProduct, _) =>
            filtersByFeatures.includes(stringProduct) &&
            dataFiltersByFeatures.push(product)
        )
    );

    return dataFiltersByFeatures;
  }

  return datas;
};
export const ShowItems = async ({
  searchParams,
  category,
}: {
  searchParams?: { [key: string]: string };
  category?: string;
}) => {
  //await new Promise((resolve) => setTimeout(resolve, 20000));
  console.log(searchParams);
  console.log(category);

  const { filtersByFeatures, filtersSort, filterByCategory, querySearch } =
    handleFilterSearchParams(searchParams);

  console.log({ filtersByFeatures });
  console.log(filtersSort);
  console.log(filterByCategory);
  console.log(querySearch);
  console.log(category);

  const products = await getData({
    filtersByFeatures,
    filtersSort,
    filterByCategory,
    querySearch,
    category,
  });
   if(!products || products.length === 0) return <NoProducts />

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
export const NoProducts = () => {
  return (
    <div className="size-full flex flex-col justify-center items-center gap-2">
      <Image alt="imageNoProduct" src={searchProduct} className="size-60 object-contain aspect-square" />
      <div>No products found!</div>
    </div>
  )
}