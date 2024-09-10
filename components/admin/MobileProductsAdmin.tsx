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
import { EllipsisIcon} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Status from "./Status";
import { ParseProductImages } from "@/lib/utils";
import { Product, Review } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { EditProductButton } from "../SubmitButtons";
import { DeleteProductBtn } from "../SubmitButtons";
import { HandleSetStatusProduct } from "./HandleSetStatusProduct";
import prisma from "../../db";
import { Badge } from "@/components/ui/badge";
import { ParseProducts } from "@/lib/utils";
export const MobileProductsAdmin = async({
  products,
}: {
  products: (Product & { reviews: Review[] })[];
}) => {

  return (
    <Card className=" py-2 sm:py-4  text-muted-foreground  md:hidden flex flex-col gap-4">
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
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-1 max-sm:gap-2">
              <div className="flex items-center justify-center">
                <div className="size-24  relative shrink-0 aspect-square">
                  <Image
                    alt="Product image"
                    className="aspect-square object-cover"
                    fill
                    src={ParseProductImages(product.images)[0].image}
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
                  <p className="font-medium text-sm"> {product.name}</p>
                  <p className="text-2xl text-blue-500 mt-auto"></p>
                </div>
                <div className="text-blue-500 font-semibold">{formatPrice(product.price)}</div>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="w-full flex flex-row items-center justify-between">
                <TotalSales productId={product.id} />
             
                <div className="flex gap-2 ml-auto">
                  {" "}
                  <EditProductButton productId={product.id} />
                  <DeleteProductBtn
                    images={ParseProductImages(product.images)}
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
export const TotalSales = async({productId}:{productId:string}) =>{
  const totalSales =  (await prisma.order.findMany()).reduce((acc,cmd)=>{
    const products = ParseProducts(cmd.products)
    return acc + products.filter((p) =>p.id === productId).length
  },0)
  return (
  
<div>
{totalSales === 0  ? (
<div>There are no sales yet</div>
):(
<Badge variant={"defaultBtn"} className="text-sm px-4 py-2">
  
  {totalSales < 10 ? "0" + totalSales : totalSales}{" "}sales</Badge>
)}
</div>
  )
}
