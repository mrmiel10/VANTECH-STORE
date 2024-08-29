"use client";
import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/truncate";
import { useRouter } from "next/navigation";
import { productsType } from "@/lib/typeProducts";
import { useCartStore } from "@/lib/cart.store";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import {Product } from "@prisma/client";
import { Review } from "@prisma/client";
import { Rating } from "@mui/material";
import { formatPrice } from "@/lib/formatData";
import { filtersByCategories } from "@/lib/listFiltersProducts";
import { sortFilters } from "@/lib/listFiltersProducts";
import { Card } from "@/components/ui/card";
import { ParseProductImages } from "@/lib/parseData";
// import { products } from "@/lib/products";
export const CardProduct = (
  product: PropsWithChildren< Product & { reviews: Review[] }>
) => {
  const Router = useRouter();
  if (!product === undefined) return null;

  return (
    <div className="text-muted-foreground flex flex-col w-full shadow-md rounded-md overflow-hidden  cursor-pointer ">
      <div
        onClick={() => Router.push(`/${product?.id}/product`)}
        className=" w-full relative aspect-square overflow-hidden h-52"
      >
        { product && product.images && (
          <Image
            fill
            src={ParseProductImages(product.images)[0].image}
            alt={product?.description!}
            className="object-contain"
          />
        )}
      </div>
      <div className="border-t grid grid-cols-1 flex-grow gap-y-4 min-h-5  bg-white text-sm p-4  ">
        <p className=" text-muted-foreground line-clamp-3 leading-5">{product.name}</p>
     
        <div className="flex  items-center w-full flex-col justify-end">
          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center gap-1">
              <p className="font-semibold text-blue-500 antialiased"> {formatPrice(product.price)}</p>
              <Rating className="ml-auto" value={4.5} precision={0.5} readOnly size="small" />
            </div>

            <div className="flex gap-2 ml-auto">{product.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const ToggleCartButton = ({
  product,
}: {
  product: Product & { reviews: Review[] };
}) => {
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    category: product.category,
    status:product.status,
    quantity: 1,
    images: ParseProductImages(product.images),
    price: product.price,
  });

  const { isInCart, toggleCart } = useCartStore(
    useShallow((s) => ({
      isInCart: s.cart.some((item) => item?.id === cartProduct.id),
      toggleCart: s.toggleCart,
    }))
  );
  return (
    <Button
      className=""
      variant={isInCart ? "defaultBtn" : "outline"}
      onClick={() => toggleCart(cartProduct)}
    >
      <ShoppingCart
        className={clsx(isInCart ? "text-white" : "text-blue-500")}
        size={16}
        fill={isInCart ? "white" : "none"}
      />
    </Button>
  );
};

export const ToggleLikeButton = ({
  product,
}: {
  product: Product & { reviews: Review[] };
}) => {
  // const favorites = useCartStore((s) => s.favorites)
  // const toggleFavorite = useCartStore((s) => s.toggleFavorite)
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    status:product.status,
    category: product.category,
    quantity: 1,
    images: ParseProductImages(product.images),
    price: product.price,
  });
  const { isFavorite, toggleFavorite } = useCartStore(
    useShallow((s) => ({
      isFavorite: s.favorites.some((product) => product.id === cartProduct.id),
      toggleFavorite: s.toggleFavorite,
    }))
  );
  // const isFavorite = favorites.includes(id)
  return (
    <Button variant={"outline"} onClick={() => toggleFavorite(cartProduct)}>
      <Heart
        className="text-muted-foreground"
        size={16}
        fill={isFavorite ? "blue" : "none"}
      />
    </Button>
  );
};
export const SkeletonProductsCards = () => {
  const numberSkeletonCards = 4;
  const skeletonsCards = Array.from({ length: numberSkeletonCards }, (_, i) => (
    <SkeletonCard key={i} />
  ));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-6">
      {skeletonsCards}
    </div>
  );
};
export const SkeletonCard = () => {
  return (
    <Card className="border-muted flex flex-col w-full rounded-md overflow-hidden bg-white">
      <Skeleton className="h-52   rounded-none" />
      <div className=" border-t grid grid-cols-1 flex-grow gap-y-4 min-h-5 text-sm p-4  ">
        <Skeleton className="h-14 w-full " />
        <div className="flex  items-center w-full flex-col justify-end">
          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center gap-1">
            <Skeleton className="h-5 w-24 " />
            <Skeleton className="w-20 h-4 ml-auto" />
            </div>
            <div className="flex gap-2 justify-end ">
            <Skeleton className=" w-12 h-10 " />
            <Skeleton className="  w-12 h-10 " />
          </div>
          </div>
        </div>
    
      </div>
    </Card>
  );
};
