"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, Pencil, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Status from "./Status";
import { MapStatus, ParseImages } from "./ProductsTable";
import { Product, Review } from "@prisma/client";
import { formatPrice } from "@/lib/formatPrice";
import { EditProductButton } from "../SubmitButtons";
import { DeleteProductBtn } from "../SubmitButtons";
import { HandleSetStatusProduct } from "./HandleSetStatusProduct";
export const MobileProductsAdmin = ({
  products,
}: {
  products: (Product & { reviews: Review[] })[];
}) => {
  return (
    <Card className=" py-2 sm:py-4  text-muted-foreground  md:hidden flex flex-col gap-8">
      {products.map((product, _) => (
        <div key={product.id}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex ">
                <Button
                  variant={"ghost"}
                  className="ml-auto rounded-full size-6  p-0 mr-2 hover:text-blue-500"
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
              <HandleSetStatusProduct
                status={product.status}
                productId={product.id}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex flex-col w-full px-3">
            <div className="grid grid-cols-3 max-xs:grid-cols-1 max-sm:gap-y-2">
              <div className=" flex gap-4  items-center justify-center">
                <div className="size-24  relative shrink-0 aspect-square">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    fill
                    src={ParseImages(product.images)[0].image}
                  />
                </div>
              </div>
              <div className="col-span-2  flex flex-col gap-2 ">
              <div>
                  <Status status={product.status} />
                </div>
                <div>
                <div className="">Category:{product.category}</div>
                <div className="">Brand: {product.brand}</div> 
                            
                </div>             
                        
                <div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-sm"> {product.name}</p>
                    <p className="text-2xl text-blue-500 mt-auto">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="flex flex-col" >
             <div className="w-full flex flex-row items-center justify-between  self-end">
             <div>Sales:25444</div>
              <div className="flex gap-2 ml-auto">
                {" "}
                <EditProductButton productId={product.id} />
                <DeleteProductBtn
                  images={ParseImages(product.images)}
                  id={product.id}
                />
              </div>
             </div>
             
              <Separator className="my-4 w-full" />
            </div>
          
          </div>
        </div>
      ))}
    </Card>
  );
};
