"use client";
import React, { useCallback, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import { Heart } from "lucide-react";
import {
  deleteProductInCart,
  deleteProductInFavorite,
  useCartStore,
} from "@/lib/cart.store";
import {Trash2Icon } from "lucide-react";
import { truncateText } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
 const FavoriteButtonCart = () => {
  const favorites = useCartStore((s) => s.favorites);
  //   const selectedItems = products.filter((product) =>favorites.includes(product.id))

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant={"secondary"}>
                <Heart className="size-5 mr-2" />
                {favorites.length}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>mes favoris</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="text-muted-foreground  w-[400px]">
        <div className="flex items-center gap-4">
            <h2 className="font-bold text-xl items-center text-blue-500 ">
              My Favorites
            </h2>
          {favorites.length ? (
            <Button variant={"defaultBtn"} className=" gap-1">
              <ArrowUpRight size={17} className="text-white" />
              View all
            </Button>
          ) : null}
        </div>
        {!favorites.length ? <p>Your list of favorites is empty</p> : null}

        <ul className="divide-y-2  space-y-2">
          {favorites.map((product, index) => (
            <li key={index} className="py-3">
              <div className="flex items-center">
                <div>
                  <p className="text-blue-500 font-bold">$ {product.price}</p>
                  <h3 className="text-md font-medium leading-none">
                    {truncateText(product.name)}
                  </h3>

                  {/* <p>{product.description}</p> */}
                </div>

                <Button className="group px-3 py-2 ml-auto" variant={"outline"}>
                  <Trash2Icon
                    className="group-hover:text-blue-500 transition ease duration-150"
                    size={17}
                    onClick={() => deleteProductInFavorite(product.id)}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

const Nav = () => {
  return (
    <div className="max-w-screen-xl w-full p-3 mx-auto sm:p-5">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <span className="font-bold text-blue-500 antialiased">Shopping</span>
        </div>

        <div className="flex gap-4 items-center">
          <ButtonCart />
          <FavoriteButtonCart />
        </div>
      </div>
      <hr className="border border-gray-300" />
    </div>
  );
};

export default Nav;
const ButtonCart = () => {
  const cart = useCartStore((s) => s.cart);
  const totalQty = useCartStore(useCallback((s) => s.totalQty, []));
  const getQty = useCartStore(useCallback((s) => s.getTotalQty, []));
  useEffect(() => {
    getQty();
  }, [cart, getQty]);
  //   const selectedItems = products.filter((product) =>cart.includes(product.id))
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant={"defaultBtn"} >
                
                  <ShoppingCart className="size-5 mr-2" />
                  <span>{totalQty}</span>
                
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Votre panier</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="text-muted-foreground  w-[400px]">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-xl items-center text-blue-500 ">
            Mon panier
          </h2>
          {cart.length ? (
            <Button variant={"defaultBtn"} className=" gap-1" asChild>
              <Link href="/cart">
                {" "}
                <ArrowUpRight size={17} className="text-white" />
                View all
              </Link>
            </Button>
          ) : null}
        </div>
        {!cart.length ? <p className="text-sm">your cart is empty</p> : null}

        <ul className="divide-y-2  space-y-2">
          {cart.slice(0, 3).map((product, index) => (
            <li key={index} className="py-3">
              <div className="flex items-center">
                <div>
                  <p className="text-blue-500 font-bold">$ {product.price}</p>
                  <h3 className="text-md font-medium leading-none">
                    {truncateText(product.name)}
                  </h3>

                  {/* <p>{product.description}</p> */}
                </div>

                <Button className="group px-3 py-2 ml-auto" variant={"outline"}>
                  <Trash2Icon
                    className=" group-hover:text-blue-500 transition ease duration-150"
                    size={17}
                    onClick={() => deleteProductInCart(product.id)}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
