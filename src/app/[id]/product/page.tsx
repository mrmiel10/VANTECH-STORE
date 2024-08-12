
import React, { useCallback, useEffect, useState } from "react";
import { products } from "@/lib/products";
import { productsType } from "@/lib/typeProducts";
import prisma from "../../../../db";
import {
  CartProductType,

} from "@/lib/cart.store";

import Image from "next/image";

import { ListRating } from "./ListRating";
import { AddRating } from "./AddRating";
import { searchParamsCache } from "@/lib/nuqs";
import ProductsFeatures from "./ProductsFeatures";
interface IParams {
  id: number;
  
}
const PageProduct = async ({ params,searchParams }: { params: IParams,searchParams:Record<string, string | string[] | undefined>}) => {
 //await new Promise((resolve) => setTimeout(resolve, 50000));
  console.log(params.id);

  const paramSearch = searchParamsCache.parse(searchParams)
  console.log(paramSearch)
  //const product = products.find((item) => item.id === Number(params.id));
  const product = await prisma.product.findUnique({
    where:{
      id:Number(params.id)
    },
    include:{
      reviews:true
    }
  })
  if (!product) return <p>Pas de produit disponible</p>;
  return (
    <div className="overflow-hidden min-h-10">
   
      <ProductsFeatures product={product}/>
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-12 md:px-6 lg:max-w-7xl">
       <ListRating  />
       <AddRating />
      </section>
    </div>
  );
};

export default PageProduct;

const ProductImage = ({ cartProduct }: { cartProduct: CartProductType }) => {
  return (
    <div
      className="
    w-full
  h-full
  max-h-[400px]
  min-h-[300px]
  sm:min-h-[500px]
  relative aspect-square"
    >
      <Image
        fill
        className="w-full
               h-full
                object-contain"
        src={cartProduct.image}
        alt={cartProduct.name}
      />
    </div>
  );
};
