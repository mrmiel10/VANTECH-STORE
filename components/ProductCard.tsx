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
const ProductCard = ({ products }: { products: productsType[] }) => {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-6">
      {}
      {products.map((product, index) => (
        <CardProduct key={index} {...product}>
          <ToggleLikeButton product={product} />
          <ToggleCartButton product={product} />
        </CardProduct>
      ))}
    </div>
  );
};

export default ProductCard;
const CardProduct = (
  product: PropsWithChildren<productsType> & { className?: string }
) => {
  const Router = useRouter();
  return (
    <div className="text-muted-foreground flex flex-col w-full shadow-md rounded-md overflow-hidden  cursor-pointer ">
      <div
        onClick={() => Router.push(`/${product.id}/product`)}
        className=" w-full relative aspect-square overflow-hidden h-52"
      >
        <Image
          fill
          src={product.image}
          alt={product.description}
          className="object-contain"
        />
      </div>
      <div className="border-t flex flex-col flex-grow gap-y-3 min-h-5  bg-white text-sm p-4  ">
        <p className="font-semibold">{truncateText(product.name)}</p>
        <p>{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold">$ {product.price}</p>
          <div className="flex gap-2">
            {product.children}
            {/* <Button variant={"outline"} className='px-4 py-8 text-white cursor-pointer inline-flex bg-blue-500 hover:bg-blue-400 transition rounded-md' onClick={()=>{toggleCart?.()}}>{isInCart ? "remove" : "Add to cart"}</Button>
      <Button className='px-4 py-2 text-white cursor-pointer rounded-md' onClick={()=>{toggleFavorite?.()}}>
      <Heart fill={favorite ? "red" : "none"} />
        
      </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export const ToggleCartButton = ({ product }: { product: productsType }) => {
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    quantity: 1,
    image: product.image,
    price: product.price,
  });

  const { isInCart, toggleCart } = useCartStore(
    useShallow((s) => ({
      isInCart: s.cart.some((item) => item.id === cartProduct.id),
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

export const ToggleLikeButton = ({ product }: { product: productsType }) => {
  // const favorites = useCartStore((s) => s.favorites)
  // const toggleFavorite = useCartStore((s) => s.toggleFavorite)
  const [cartProduct, setCartProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    quantity: 1,
    image: product.image,
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
    <div className="flex flex-col w-full rounded-md overflow-hidden bg-slate-200">
      <Skeleton className="h-52   rounded-none" />
      <div className=" flex flex-col flex-grow gap-y-3 text-sm p-8 sm:p-4  ">
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-8 w-full " />
        <div className=" flex justify-between items-center">
          <Skeleton className="h-5 w-12  " />
          <div className="flex gap-2 ">
            <Skeleton className=" size-12 p-2 " />
            <Skeleton className=" size-12 p-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
