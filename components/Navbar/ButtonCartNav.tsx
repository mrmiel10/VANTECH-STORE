"use client";
import React, { useCallback, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";

import { deleteProductInCart, useCartStore } from "@/lib/cart.store";
import { Trash2Icon } from "lucide-react";
import { truncateText } from "@/lib/truncate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
const ButtonCartNav = () => {
  const cart = useCartStore((s) => s.cart);

  const totalQty = useCartStore(useCallback((s) => s.totalQty, []));
  const getQty = useCartStore(useCallback((s) => s.getTotalQty, []));
  useEffect(() => {
    getQty();
  }, [cart, getQty]);

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
            <ShoppingCartIcon className="size-6 text-muted-foreground" />
            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
            {totalQty}
            </span>
            <span className="sr-only">Cart</span>
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
                  <p className="text-blue-500 font-bold">{formatPrice(product.price)}</p>
                  <h3 className="text-md font-medium leading-none">
                    {truncateText(product.name!)}
                  </h3>
                </div>

                <Button className="group px-3 py-2 ml-auto" variant={"outline"}>
                  <Trash2Icon
                    className=" group-hover:text-blue-500 transition ease duration-150"
                    size={17}
                    onClick={() => deleteProductInCart(product.id!)}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>0
      </PopoverContent>
    </Popover>
  );
};

export default ButtonCartNav;