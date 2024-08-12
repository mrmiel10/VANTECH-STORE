"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartProductType, useCartStore } from "@/lib/cart.store";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { FolderLock, Terminal } from "lucide-react";
import { deleteAllProductsInCart } from "@/lib/cart.store";
import Link from "next/link";
import ItemContent from "./ItemContent";
import { truncateText } from "@/lib/truncate";
import PaginationProductCart from "../../../components/cart/pagination";
import { GetFilteredProductsCart } from "@/lib/GetFilteredProductsCart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Suspense } from "react";
import { SkeletonItemCartLoading } from "../../../components/Skeletons";
import cart from "../../../public/cart.png";
import { Skeleton } from "@/components/ui/skeleton";
const ClientCart = ({ currentPage }: { currentPage: number }) => {
  // const currentPage = Number(searchParams?.page) || 1;
  const Router = useRouter();
  const { cart, getTotalPrice, totalPrice } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
      getTotalPrice: s.getTotalPrice,
      totalPrice: s.totalPrice,
    }))
  );

  const totalPages = Math.ceil(cart.length / 3);
  const cartProduct = GetFilteredProductsCart(currentPage);

  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice, cart]);
  return (
    <>
      {!cart.length ? (
        <NoItems />
      ) : (
        <>
          <Card className="  w-full max-w-5xl ">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-4">
                  <h1 className=" text-2xl sm:text-3xl  text-blue-500">
                    Your Shopping Cart
                  </h1>
                  <Button
                    onClick={() => deleteAllProductsInCart()}
                    className="ml-auto hover:text-blue-500 text-muted-foreground"
                    variant={"outline"}
                  >
                    Delete All in Cart
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <div className="grid gap-6">
                <div className="grid gap-8">
                  {cartProduct.map((item) => (
                    <Suspense
                      key={item.id}
                      fallback={<SkeletonItemCartLoading />}
                    >
                      <ItemContent key={item.id} item={item} />
                    </Suspense>
                  ))}
                </div>
                <Separator />
                <PaginationProductCart totalPages={totalPages} />
                <div className="flex items-center justify-between gap-4 max-sm:flex-col">
                  <p className="text-lg">
                    TotalPrice:{" "}
                    <Suspense fallback={<Skeleton className="w-11 h-5" />}>
                      <span className="text-blue-500 font-semibold">
                        {totalPrice}
                      </span>
                    </Suspense>
                  </p>
                  <div className="flex gap-2 max-sm:flex-col-reverse max-sm:w-full">
                    <Button
                      className="hover:text-blue-500 transition ease duration-100"
                      variant="outline"
                      onClick={() => Router.push("/")}
                    >
                      Continue Shopping
                    </Button>
                    <Button variant={"defaultBtn"}>Proceed to Checkout</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <ProductsDetailsSelect productSelect= {selectProduct} /> */}
        </>
      )}
    </>
  );
};

export default ClientCart;

export const NoItems = () => {
  return (
    <Alert className="p-6">
      <div className="flex sm:items-stretch max-sm:flex-col items-center">
        <div className="relative w-64">
          <Image
            src={cart}
            alt={"cartImage"}
            className="aspect-square object-contain"
          />
        </div>
        <div className="max-sm:self-stretch">
          <div className="h-full flex flex-col mt-8 max-sm:space-y-2 gap-4">
            <div className="text-lg space-y-2">
              <AlertTitle className="font-bold text-blue-500">
                Your cart is empty!
              </AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Please back to add product in a cart
              </AlertDescription>
            </div>
            {/* <div className="flex-grow flex flex-col"> */}
            <Button className="" variant={"defaultBtn"} asChild>
              <Link href="/">Add porduct</Link>
            </Button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Alert>

    // <div className="gap-4 text-muted-foreground w-full border-2 rounded-lg border-dashed min-h-60 flex flex-col justify-center items-center">
    //   <div className="rounded-full border-dashed border size-28 flex justify-center items-center">
    //     <FolderLock size={75} />
    //   </div>

    //   <div className="space-y-1">
    //     <p className="text-center">Your cart is empty</p>
    //     <Button variant={"defaultBtn"} asChild>
    //       <Link href="/"> Back to add product in a cart</Link>
    //     </Button>
    //   </div>
    // </div>
  );
};
