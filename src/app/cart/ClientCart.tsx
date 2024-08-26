"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrice, useCartStore } from "@/lib/cart.store";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { deleteAllProductsInCart } from "@/lib/cart.store";
import Link from "next/link";
import ItemContent from "./ItemContent";
import { PaginationProductCart } from "../../../components/cart/pagination";
import { GetFilteredProductsCart } from "@/lib/GetFilteredProductsCart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Suspense } from "react";
import { SkeletonCartLoading } from "../../../components/Skeletons";
import cart from "../../../public/cart.png";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/formatPrice";
import { PropsWithChildren } from "react";
import { createOrderAction } from "@/lib/actions";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { User, Order } from "@prisma/client";
import { SchemaSafeProductsOrder } from "../../../schemas/schema";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Loader2 } from "lucide-react";
import { z } from "zod";
export const ClientCart = ({
  user,
}: {
  user: User & { orders: Order[] } | null;
}) => {
  const { cart, getTotalPrice, totalPrice } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
      getTotalPrice: s.getTotalPrice,
      totalPrice: s.totalPrice,
    }))
  );
  
  const totalPages = Math.ceil(cart.length / 3);
  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice, cart]);
  console.log(cart);
  return (
    <div className="container p-4 flex  justify-center items-center">
      {!cart.length ? (
        <NoItems />
      ) : (
        <>
          <Card className="w-full max-w-5xl ">
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
                <div>
                  <Suspense fallback={<SkeletonCartLoading length={2} />}>
                    <ShowItemsCart />
                  </Suspense>
                </div>
                <Separator />
                <PaginationProductCart totalPages={totalPages} />
                <div className="flex items-center justify-between gap-4 max-sm:flex-col">
                  <p className="text-lg">
                    TotalPrice:{" "}
                    <Suspense fallback={<Skeleton className="w-11 h-5" />}>
                      <span className="text-blue-500 font-semibold">
                        {formatPrice(totalPrice)}
                      </span>
                    </Suspense>
                  </p>
                  <div className="flex gap-2 max-sm:flex-col-reverse max-sm:w-full">
                    <Button
                      asChild
                      className="hover:text-blue-500 transition ease duration-100"
                      variant="outline"
                    >
                      <Link href="/"> Continue Shopping</Link>
                    </Button>
                    {user ? (
   <PayOrderButton user={user} />
           ):(
                <Button variant={"defaultBtn"}> 
                <RegisterLink postLoginRedirectURL="/cart">
               Proceed to Checkout
                </RegisterLink>
                </Button>
          
           )} 
                    {/* <PayOrderButton /> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

const NoItems = () => {
  return (
    <Alert className="p-6">
      <div className="flex sm:items-stretch max-sm:flex-col items-center">
        <div className="relative w-64 aspect-squar">
          <Image src={cart} alt={"cartImage"} className="e object-contain" />
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
  );
};
const ShowItemsCart = () => {
   // await new Promise((resolve) => setTimeout(resolve, 5000));
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  //const currentPage = searchParamsCache.get("page");
  const cartProduct = GetFilteredProductsCart(currentPage);
  return (
    <div className="grid gap-8">
      {cartProduct.map((item) => (
        <ItemContent key={item.id} item={item} />
      ))}
    </div>
  );
};

const PayOrderButton = ({ user }: { user: User }) => {
  const { execute,isPending } = useServerAction(createOrderAction);
  const totalPrice: number = getPrice(); 
  const { cart } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
    }))
  );
  const cartOrder = SchemaSafeProductsOrder.parse(cart);
  if (!cartOrder) throw new Error("Invalid type Cart");
  console.log(cart);
  console.log(totalPrice);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const [data, err] = await execute({
          cartOrder,
          userId: user.id,
          totalPrice: totalPrice,
        });
        if (data) {
          toast.success("create order successfully!");
           deleteAllProductsInCart()
        }
        console.log(data);
      }}
      className="w-full"
    >
      <Button disabled={isPending} variant={"defaultBtn"} className="w-full">
        {isPending ? (<Loader2 className="animate-spin size-5" />)
        
      :"  Proceed to Checkout"
      }
      
        </Button>
    </form>
  );
};
