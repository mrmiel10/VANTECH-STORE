import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "@/components/ui/tooltip";
  import { CartProductType, deleteProductInCart } from "@/lib/cart.store";
import { handleQtyDecrease } from "@/lib/cart.store";
import { handleQtyIncrease } from "@/lib/cart.store";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { LucideTrash2 } from "lucide-react";
// import { ToggleLikeButton } from "../page";
import { ToggleLikeButton } from '../../../components/ToggleLikeButton';
import  { useCallback, useEffect } from "react";
import Image from "next/image";
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
 const ItemContent = async ({item}:{item:CartProductType}) => {
  const router = useRouter()
  //await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <div
                    key={item.id}
                    className="grid grid-cols-[150px_1fr_auto] items-center gap-y-8 sm:gap-4"
                  >
                    <div onClick={()=>router.push(`/${item.id}/product`)} className="hover:cursor-pointer max-sm:h-32 col-span-2 sm:col-span-1 flex justify-center items-center">
                    <Image
                    
                    src={item.image}
                    alt={item.description!}
                    width={150}
                    height={150}
                    className="rounded-md object-cover "
                  />
                    </div>
                    
                    <div className="grid gap-2 col-span-2 sm:col-span-1">
                      <div >
                      <h1 className="max-sm:text-center text-wrap text-blue-500">{item.name}</h1>
                      <div className="max-sm:justify-center text-sm flex max-sm:flex-row gap-1 font-medium">
                        <p className="text-muted-foreground ">
                          ${item.price.toFixed(2)}
                        </p>
                       <Separator orientation="vertical" />
                        <p>
                          Total:{" "}
                          <span className="font-semibold">
                            {item.quantity * item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                   
                      
                    </div>
                    <div className=" col-span-2 sm:col-span-1">
                      <div className=" flex items-center gap-2 max-sm:justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="group"
                          onClick={() => handleQtyDecrease(item)}
                        >
                          <MinusIcon className="h-4 w-4 group-hover:text-blue-500" />
                        </Button>
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="group"
                          onClick={() =>
                            handleQtyIncrease(
                              item
                             
                            )
                          }
                        >
                          <PlusIcon className="h-4 w-4 group-hover:text-blue-500" />
                        </Button>
                        <Button
                          className="group"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            deleteProductInCart(item.id);
                          }}
                        >
                          <LucideTrash2
                            className="group-hover:text-blue-500"
                            size={20}
                          />
                          {/* <XIcon className="h-4 w-4" /> */}
                        </Button>
                        <div className="">
                          {" "}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger >
                               
                                <ToggleLikeButton product={item} />
                              </TooltipTrigger>
                              <TooltipContent className="border-blue-500">
                                <p className="text-blue-500">Add to favorite</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      </div>
                  </div>
  )
}
export default ItemContent