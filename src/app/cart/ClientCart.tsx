"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartProductType, useCartStore } from "@/lib/cart.store";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { FolderLock } from "lucide-react";
import { deleteAllProductsInCart } from "@/lib/cart.store";
import Link from "next/link";
import ItemContent from "./ItemContent";
import { truncateText } from "@/lib/truncate";
import PaginationProductCart from "../../../components/cart/pagination";
import { GetFilteredProducts } from "@/lib/GetFilteredProducts";
const ClientCart = ({currentPage}:{currentPage:number}) => {
  // const currentPage = Number(searchParams?.page) || 1;
  const Router = useRouter();
  const { cart, getTotalPrice, totalPrice } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
      getTotalPrice: s.getTotalPrice,
      totalPrice: s.totalPrice,
    }))
  );

const totalPages = Math.ceil(cart.length / 3)
const cartProduct = GetFilteredProducts(currentPage)
  //   const getQty = useCartStore(useCallback((s)=> s.getTotalQty,[]))

  //   const handleQtyIncrease = useCartStore(useCallback((s)=>s.handleQtyIncrease,[]))
  //   const handleQtyDecrease = useCartStore(useCallback((s)=>s.handleQtyDecrease,[]))

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
            <h1 className=' text-2xl sm:text-3xl  text-blue-500'>Your Shopping Cart</h1>
            <Button onClick={()=> deleteAllProductsInCart()}  className="ml-auto hover:text-blue-500 text-muted-foreground" variant={"outline"}>Delete All in Cart</Button>
            </div>
     
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <div className="grid gap-6">
              <div className="grid gap-8">
                {cartProduct.map((item) => (
                 <ItemContent  key={item.id} item={item} />
                ))}
              </div>
              <Separator />
              <PaginationProductCart  totalPages={totalPages} /> 
              <div className="flex items-center justify-between gap-4 max-sm:flex-col">
                <p className="text-lg">
                  TotalPrice:{" "}
                  <span className="text-blue-500 font-semibold">
                    {totalPrice}
                  </span>
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
export const ProductsDetailsSelect = ({productSelect}:{productSelect:CartProductType | null})=> {
  if(!productSelect) return null
  return (
    <div className="col-span-2 sm:col-span-1 ">
       {/* <div className='text-muted-foreground flex flex-col shadow-md rounded-md overflow-hidden  cursor-pointer '> */}
       <Card>
        <CardContent className="p-0">
        <div  className=' w-full relative aspect-square overflow-hidden h-52'>
        <Image fill src={productSelect.image} alt={productSelect.description} className='object-contain' />
       </div>
        </CardContent>
       </Card>
       {/* <div  className=' w-full relative aspect-square overflow-hidden h-52'>
        <Image fill src={productSelect.image} alt={productSelect.description} className='object-contain' />
       </div> */}
       <div className=' flex flex-col gap-y-3  text-sm p-3'>
        <p className='font-semibold'>{productSelect.name}</p>
        <p className='font-semibold text-lg'>$ {productSelect.price}</p>
        <p>{productSelect.description}</p>
      
       </div>
        
    {/* </div> */}
    </div>
   
  )
}
export const NoItems = () => {
  return (
    <div className="gap-4 text-muted-foreground w-full border-2 rounded-lg border-dashed min-h-60 flex flex-col justify-center items-center">
      <div className="rounded-full border-dashed border size-28 flex justify-center items-center">
        <FolderLock size={75} />
      </div>

      <div className="space-y-1">
        <p className="text-center">Your cart is empty</p>
        <Button variant={"defaultBtn"} asChild>
          <Link href="/"> Back to add product in a cart</Link>
        </Button>
      </div>
    </div>
  );
};
