import React, { useCallback, useEffect, useState } from "react";
import prisma from "../../../../db";
import { ListRating } from "./ListRating";
import { AddRating, } from "./AddRating";
import { searchParamsCache } from "@/lib/nuqs";
import ProductsFeatures from "./ProductsFeatures";
import { getCurrentUser } from "@/lib/actions";
import leaveReview from "../../../../public/add review.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { ParseProducts } from "@/lib/parseData";
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

  const user = await getCurrentUser();

  if (!product) return <p>Pas de produit disponible</p>;
  const deliveredOrder = user?.orders.some(
    (order) =>
      ParseProducts(order.products).find(
        (item) => item.id === product.id
      ) && order.deliveryStatus.toLowerCase() === "delivered"
  );
  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user?.id;
  });
  return (
    <div className="overflow-hidden min-h-10">
      <ProductsFeatures product={product} />
      <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:gap-12 md:px-6 lg:max-w-7xl">
       <div>
       {product.reviews.length !== 0 ? (
          <ListRating productId={params.id} />
        ) :  deliveredOrder ? (
          <CanLeaveReview />
        ) : null}
       </div>
       

        <AddRating product={product} user={user} />
      </section>
    </div>
  );
};

export default PageProduct;
const CanLeaveReview = () => {
  return (
    <div className="w-full min-h-40 grid grid-cols-1 gap-2 justify-items-center items-center">
      <Image src={leaveReview} alt={"can leave review!"} width={300} height={300} />
      <div className="grid gap-2 text-muted-foreground">
        <div className="font-semi-bold text-blue-500 font-semibold text-lg">
          This product has no review!
        </div>
        <div>You can leave a review </div>
      </div>
    </div>
  );
};
