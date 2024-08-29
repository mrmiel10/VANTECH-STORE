import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { EllipsisIcon, MoreHorizontal } from "lucide-react";
import { formatPrice } from "@/lib/formatData";
import { ListOrderedIcon } from "lucide-react";
import { CopyIdOrder } from "@/app/orders/CopyIdOrder";
import { searchParamsCache } from "@/lib/nuqs";
import { getFilteredOrders, getFilteredProducts, getOrdersPages } from "@/lib/actions";
import PaginationTable from "../../../components/Pagination";
import { User, Order } from "@prisma/client";
import { Card } from "@/components/ui/card";
import PaymentStatus from "../../../components/admin/orders/PaymentStatus";
import { DeliveryStatusOrder } from "../../../components/admin/orders/DeliveryStatusOrder";
import MobileCopyIdOrder from "./MobileCopyIdOrder";
import Link from "next/link";
import { formatDateToLocal } from "@/lib/formatData";
export const ShowOrdersUser = async (   {
  user,
}: {
  user: User & { orders: Order[] };
}) =>
 
  { 
    const userId = user.id
    const currentPage = searchParamsCache.get("page");
    const deliveryStatus = searchParamsCache.get("deliveryStatus");
    const paymentStatus = searchParamsCache.get("paymentStatus");
    const orderByDate = searchParamsCache.get("orderDate")
    const searchOrder = searchParamsCache.get("search");
    console.log(deliveryStatus,paymentStatus,searchOrder)
   const orders = await getFilteredOrders(searchOrder, currentPage,deliveryStatus,paymentStatus,orderByDate,userId)
    const { totalPages } = await getOrdersPages(
      searchOrder,
      deliveryStatus,
      paymentStatus,
      user?.id
    );

    return (
      <div className="grid grid-cols-1 auto-rows-max gap-8">
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order,_)=>(
  <Card key={order.id} className="grid grid-col-1 gap-2 text-muted-foreground sm:hidden">
  <div className="flex pl-4 py-2  w-full items-center">
    <div className="mr-auto flex gap-2">
      <span>Order <span className="text-blue-500">{order.id.length > 20 ? order.id.substring(0,15) + "..." : order.id}</span></span> 
 <MobileCopyIdOrder orderId={order.id} />
    
    </div>
  <DropdownMenu >

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
      <Link href={`/orders/${order.id}/orderdetail`}>
      <DropdownMenuItem className="flex gap-1 items-center justify-center">
  <ListOrderedIcon className="size-5" />
  see order details
</DropdownMenuItem>
</Link>
   
<CopyIdOrder orderId={order.id} />
    </DropdownMenuContent>
  </DropdownMenu>
  </div>

  <div className="grid gap-3 px-8  py-4 sm:text-blue-500">
    <div className="flex">
      <div className="mr-auto text-blue-500 font-semibold">Order Date</div>
      <div className="ml-auto">{formatDateToLocal(order.createdDate.toISOString())}</div>
    </div>
    <div className="flex ">
      <div className="mr-auto text-blue-500 font-semibold">  Items order </div>
    <div className="ml-auto ">4</div>
    </div>
    <div className="flex ">
      <div className="mr-auto text-blue-500 font-semibold">  Amount </div>
    <div >  {formatPrice(order.amount)}</div>
    </div>
    <div className="flex ">
      <div className="mr-auto text-blue-500 font-semibold"> Paymentstatus</div>
      <PaymentStatus status={order.status} className="ml-auto"/>
    </div>
    <div className="flex ">
    <div className="mr-auto text-blue-500 font-semibold"> Deliverystatus</div> 
      <DeliveryStatusOrder status={order.deliveryStatus} className="ml-auto" />
    </div>

  </div>
</Card>
        ))}
    
      </div>
       
       
        <Table className="hidden sm:table">
          <TableHeader className="">
            <TableRow>
              <TableHead className="">Date</TableHead>
              <TableHead className="">Payment status</TableHead>
              <TableHead className="">Delivery Status</TableHead>

              <TableHead className="text-right">Amount</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order,_)=>(
                 <TableRow key={order.id} className="bg-accent text-muted-foreground">
                 <TableCell className="text-muted-foreground">
                 {formatDateToLocal(order.createdDate.toISOString())}
                 </TableCell>
                 <TableCell>
                   <PaymentStatus status={order.status} />
                 </TableCell>
                 <TableCell className="">
                   <DeliveryStatusOrder status={order.deliveryStatus} />
                 </TableCell>
   
                 <TableCell className="text-right">
                   {formatPrice(order.amount)}
                 </TableCell>
                 <TableCell className="flex justify-end">
                   <ActionsOrderUser orderId={order.id} />
                 </TableCell>
               </TableRow>
            ))}
       
          </TableBody>
        </Table>
    
       <PaginationTable totalPages={totalPages} />
      </div>
    );
  };

export const ActionsOrderUser = ({orderId}:{orderId:string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" text-muted-foreground ">
        <DropdownMenuItem asChild className="flex gap-1 items-center justify-center">
         <Link href={`/orders/${orderId}/orderdetail`}> <ListOrderedIcon className="size-5" />
         see order details</Link>
         
        </DropdownMenuItem>
        <CopyIdOrder orderId={orderId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
