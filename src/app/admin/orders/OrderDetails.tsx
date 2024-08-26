"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

import { HandleSetDeliveryOrderStatus } from '../../../../components/admin/orders/HandleSetDeliveryOrderStatus';
import { DeliveryStatusOrder } from '../../../../components/admin/orders/DeliveryStatusOrder';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
  } from "@/components/ui/pagination";
import { Separator } from '@/components/ui/separator';
import PaymentStatus from '../../../../components/admin/orders/PaymentStatus';
import { ChevronLeft, ChevronRight, Copy, CreditCard } from 'lucide-react';
import CopyPasteButton from '../../../../components/CopyPasteButton';
import { useShallow } from 'zustand/react/shallow';
import { useOrderStore } from '@/lib/order.store';
import { JsonValue } from '@prisma/client/runtime/library';
import { SchemaSafeProductsOrder } from '../../../../schemas/schema';
import { formatPrice } from '@/lib/formatPrice';
import { formatDateToLocal } from '@/lib/formatDate';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
 
export const OrderDetails = () => {
  const { order} = useOrderStore(
    useShallow((s) => ({
    order:s.order
     
    }))
  );
  if(!order) return null
  const productsOrder = ParseProducts(order.products)
  return (
    <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
        <CardTitle className="text-blue-500 group flex items-center gap-2 text-lg">
          {/* Order Oe31b70H */}
        
                 {order?.id.substring(0,20) + "..."}     
                  <CopyPasteButton  className="bg-background flex items-center justify-center size-6 rounded-md  text-muted-foreground hover:text-blue-500 " />
                  <span className="sr-only">Copy Order ID</span>
            
     
        </CardTitle>
        <div className="grid grid-cols-1 gap-2">
      
  {/* <CardDescription>Date:  {formatDateToLocal(order.createdDate.toISOString())}</CardDescription>  */}
          {/* <CardDescription>Date: November 23, 2023</CardDescription> */}
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Payment: </span>
            {/* <PaymentStatus status="paid" className="ml-1 bg-transparent" /> */}
            <PaymentStatus status={order.status} className="ml-1 bg-transparent" />
          </div>
          <div className="flex items-center  text-sm text-muted-foreground">
            <span>Delivery:{" "} </span>{"  "}
            <DeliveryStatusOrder status={order.deliveryStatus} className="ml-1"/>
            {/* <DeliveryStatusOrder status="Dispatched" className="ml-1"/> */}
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1">
<HandleSetDeliveryOrderStatus status={order.deliveryStatus} orderId={order.id} />
{/* <HandleSetDeliveryOrderStatus status={"ddd"} orderId={"orde2347dds"} /> */}
      </div>
      {/* <div className="flex flex-col"><p><Button className="px-0 py-0 h-fit w-fit"  variant={"outline"}><kbd  className="px-1 py-">Ctrl</kbd></Button> +</p></div> */}
    </CardHeader>
    <CardContent className="p-6 text-sm text-muted-foreground">
      <div className="grid gap-3">
        <div className="font-semibold text-blue-500">Order Details</div>
        {/* <ul className="grid gap-3 ">
          <li className="flex items-center justify-between">
            <span className="">
              Glimmer Lamps x <span>2</span>
            </span>
            <span>$250.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="">
              Aqua Filters x <span>1</span>
            </span>
            <span>$49.00</span>
          </li>
        </ul> */}
      
        <ul className="grid gap-3 ">
        {productsOrder.map((product,_)=>(
         
             <li key={product.id} className="flex items-center justify-between">
                <TooltipProvider>
           <Tooltip>
             <TooltipTrigger asChild>
             <span className="">
              {product.name.length < 20 ? product.name : product.name.substring(0,20) + "..."}
               <span className='ml-2'>x{" "}{product.quantity}</span>
            </span>
             </TooltipTrigger>         
         
             <TooltipContent className='text-muted-foreground hover:text-blue-500 hover:font-semibold w-52 min-h-20'>
               <p>{product.name}</p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
            <span>{formatPrice(product.price * product.quantity)}</span>
          </li>
          
          //   <li key={product.id} className="flex items-center justify-between">
          //   <span className="">
          //     {product.name.length < 20 ? product.name : product.name.substring(0,20) + "..."}
          //      <span className='ml-2'>x{" "}{product.quantity}</span>
          //   </span>
          //   <span>{product.price}</span>
          // </li>
        ))}        
        </ul>
        <Separator className="my-2" />
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="">Subtotal</span>
            <span>{formatPrice(order.amount)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="">Shipping</span>
            <span>$5.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>$25.00</span>
          </li>
          <li className="text-blue-500 flex items-center justify-between font-semibold">
            <span className="">Total</span>
            <span>$329.00</span>
          </li>
        </ul>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-3">
          <div className="font-semibold text-blue-500">
            Shipping Information
          </div>
          <address className="grid gap-0.5 not-italic text-muted-foreground">
            <span>Liam Johnson</span>
            <span>1234 Main St.</span>
            <span>Anytown, CA 12345</span>
          </address>
        </div>
        <div className="grid auto-rows-max gap-3">
          <div className="font-semibold text-blue-500">
            Billing Information
          </div>
          <div className="">Same as shipping address</div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-3">
        <div className="font-semibold text-blue-500">
          Customer Information
        </div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Customer</dt>
            <dd>{order.user.firstName}{" "} {order.user.lastName}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd>
              <a href="mailto:">{order.user.email}</a>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Phone</dt>
            <dd>
              <a href="tel:">+1 234 567 890</a>
            </dd>
          </div>
        </dl>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-3">
        <div className="font-semibold text-blue-500">
          Payment Information
        </div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              Visa
            </dt>
            <dd>**** **** **** 4532</dd>
          </div>
        </dl>
      </div>
    </CardContent>
    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">
        Updated <time dateTime="2023-11-23">November 23, 2023</time>
      </div>
      <Pagination className="ml-auto mr-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <Button size="icon" variant="outline" className="h-6 w-6">
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="sr-only">Previous Order</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button size="icon" variant="outline" className="h-6 w-6">
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="sr-only">Next Order</span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardFooter>
  </Card>
  )
}

export const ParseProducts = (products:JsonValue) =>{
  const stringProducts = products as string
  return SchemaSafeProductsOrder.parse(JSON.parse(JSON.stringify(stringProducts)))
}