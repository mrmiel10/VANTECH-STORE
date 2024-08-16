import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Card } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { EllipsisIcon, Pencil, TrashIcon } from 'lucide-react';
  import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Status from './Status';
import Shoe from "../../public/blackShoe.jpg"
import { MapStatus, ParseImages } from './ProductsTable';
import { Product,Review } from "@prisma/client";
import { revalidatePath } from 'next/cache';

import { deleteProduct, handleSetStatusProduct } from '@/lib/actions';
import { formatPrice } from '@/lib/formatPrice';
import { EditProductButton } from '../SubmitButtons';
import { toast } from "sonner";

import { deleteStorageImages } from '@/lib/actions';
 export const MobileProductsAdmin = ({
    products,
  }: {
    products: (Product & { reviews: Review[] })[];
  }) => {
  return (
    <Card className="px-6 py-2 sm:py-4  text-muted-foreground block md:hidden">
         {products.map((product,_)=>(
          <>
               <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex ">
          <Button
            variant={"ghost"}
            className="ml-auto rounded-full size-6  p-0"
          >
            {" "}
            <EllipsisIcon className="size-5 " />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-2 text-muted-foreground"
      >
      
        <DropdownMenuLabel className="text-blue-500">
          Set product status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
     
        {MapStatus.map((status, _) => (
                  <DropdownMenuItem key={"status"} className="focus:text-blue-500">
                    <form action={async(formData)=>{
                     //   "use server"
                      try {
                         await handleSetStatusProduct(formData)
                        revalidatePath("admin/dashboard/manage-products")
                        toast.success(" updated!")
                      } catch (error) {
                        toast.error("error updated!")
                      }
                   
                    }}>
                    <input type="hidden" name="status" value={status} />
                    <input type="hidden" name="statusId" value={product.id} />
                    <Button type="submit">
                      {status[0].toUpperCase() + status.slice(1)}
                    </Button>
                    </form>
                   
                  </DropdownMenuItem>
                ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <div className="flex flex-col items-center w-full sm:pr-8">
      <div className="grid grid-cols-[1fr_150px] max-sm:gap-y-2">
        <div className="col-span-2 sm:col-span-1 flex gap-4 max-size-500:flex-col items-center">
          <div className="w-32 h-32 relative shrink-0">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              fill
              src={ParseImages(product.images)[0].image}
            />
          </div>
          <div>
            <div className="flex flex-col gap-1">
              <p className="font-medium">
                {" "}
              {product.name}
              </p>
              <p className="text-2xl text-blue-500 mt-auto">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:ml-auto flex flex-col gap-2 ">
          <div className="flex gap-2 flex-wrap">
            <div className="sm:w-full text-start  sm:text-end">
             {product.category}
            </div>
            <Separator className="h-5 bg-muted-foreground sm:hidden" orientation="vertical" />
            <div className="sm:w-full text-start sm:text-end">
              brand: {product.brand}
            </div>
          </div>
          <div className="sm:w-full justify-start sm:justify-end flex items-center gap-1">
            status: {product.status}
            <Status status={product.status}  />
          </div>
        </div>
      </div>
      {/* <Separator /> */}
      <Separator className="my-4" />
      <div className="flex items-center w-full">
        <div>Total Sales:25444</div>
        <div className="flex gap-2 ml-auto">
          {" "}
          <EditProductButton productId={product.id} />
          <Button
                  onClick={async () => {
                    try {
                      await Promise.all([
                        deleteProduct(product.id),
                        deleteStorageImages(ParseImages(product.images)),
                      ]);
                      revalidatePath("/admin/manage-products");
                    } catch (error) {
                      toast.success("Error deleting product!");
                    }
                  }}
                  className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
                  variant={"outline"}
                >
                  {" "}
                  <TrashIcon className="size-5" />
                </Button>
        </div>
      </div>
    </div>
          </>
        ))}
 
  </Card>

  )
}
