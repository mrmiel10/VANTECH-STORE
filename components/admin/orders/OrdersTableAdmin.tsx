import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { DeliveryStatusOrder } from './DeliveryStatusOrder';
import { Badge } from '@/components/ui/badge';
import PaymentStatus from './PaymentStatus';
import { searchParamsCache } from '@/lib/nuqs';
import prisma from '../../../db';
import PaginationTable from '../../Pagination';
import { getFilteredOrders, getOrdersPages } from '@/lib/actions';
import { formatDateToLocal } from '@/lib/formatData';
import { formatPrice } from '@/lib/formatData';
import RowOrder from './RowOrder';
import { Alert,AlertTitle,AlertDescription } from "@/components/ui/alert"
import searchInTable from "../../../public/search.png"
import Image from 'next/image';
export const OrdersTableAdmin = async() => {
  const currentPage = searchParamsCache.get("page");
  const searchOrder = searchParamsCache.get("search")
  const deliveryStatus = searchParamsCache.get("deliveryStatus")
;
const lastOrder = (await prisma.order.findFirst({
  orderBy:{
    createdDate:"asc"
  },
  include:{
    user:true
  }
}))
    // await new Promise((resolve) => setTimeout(resolve, 20000));
 
  const {totalPages} = await getOrdersPages(searchOrder,deliveryStatus)
  if (totalPages === 0) return <NoOrders />
   const orders= await getFilteredOrders(searchOrder,currentPage,deliveryStatus);
    console.log(deliveryStatus)
  return (
    <div className='grid grid-cos-1 gap-4'>
       <Table>
        
        <TableHeader className=''>
          <TableRow >
            <TableHead className=''>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">
              Payment status
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              Delivery Status
            </TableHead>
            {/* <TableHead className="hidden md:table-cell">
              Date
            </TableHead> */}
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order,_)=>(
            <RowOrder key={order.id} order={order} lastOrder={lastOrder} />
  
          ))}
               
        </TableBody>
      </Table>

      <PaginationTable totalPages={totalPages} />
    </div>
   
  )
}
const NoOrders = () =>{
  return (
    <div className="container flex flex-col gap-8 justify-center items-center px-5 md:px-10  max-w-5xl">
          <Alert className="p-6">
    <div className="flex sm:items-stretch max-sm:flex-col items-center">
      <div className="relative w-64 aspect-square">
        <Image src={searchInTable} alt={"cartImage"} className=" object-contain" />
      </div>
      <div className="max-sm:self-stretch">
        <div className="h-full flex flex-col mt-8 max-sm:space-y-2 gap-4">
          <div className="text-lg space-y-2">
            <AlertTitle className="font-bold text-blue-500">
        No Orders match your filter!
            </AlertTitle>
            <AlertDescription className="text-muted-foreground">
        Please try another filter
            </AlertDescription>
          </div>
        
        
        </div>
      </div>
    </div>
  </Alert>
    </div>

  )

}

