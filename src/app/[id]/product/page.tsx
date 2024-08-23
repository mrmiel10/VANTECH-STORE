import React, { useCallback, useEffect, useState } from "react";
import prisma from "../../../../db";
import { ListRating } from "./ListRating";
import { AddRating } from "./AddRating";
import { searchParamsCache } from "@/lib/nuqs";
import ProductsFeatures from "./ProductsFeatures";
import { getCurrentUser } from "@/lib/actions";
interface IParams {
  id: string;
}
const PageProduct = async ({
  params,
  searchParams,
}: {
  params: IParams;
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  //await new Promise((resolve) => setTimeout(resolve, 50000));
  console.log(params.id);
  const paramSearch = searchParamsCache.parse(searchParams);
  console.log(paramSearch);
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      // reviews:true
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
 
  const user = await getCurrentUser()
  if (!product) return <p>Pas de produit disponible</p>;
  return (
    <div className="overflow-hidden min-h-10">
      <ProductsFeatures product={product} />
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-12 md:px-6 lg:max-w-7xl">
        {product.reviews.length !== 0 ? (
          <ListRating productId={params.id} />
        ) : (
          <p>Aucun commentaire</p>
        )}
        {user && (
   <AddRating product={product} user={user} />
        ) }
  
      </section>
    </div>
  );
};

export default PageProduct;
