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
import { formatDateToLocal } from '@/lib/formatDate';
import { formatPrice } from '@/lib/formatPrice';
export const OrdersTableAdmin = async() => {
  const currentPage = searchParamsCache.get("page");
  const searchOrder = searchParamsCache.get("search")
  const deliveryStatus = searchParamsCache.get("deliveryStatus")

    // await new Promise((resolve) => setTimeout(resolve, 20000));
 
  const {totalPages} = await getOrdersPages(searchOrder,deliveryStatus)
  const orders= await getFilteredOrders(searchOrder,currentPage,deliveryStatus);
    console.log(deliveryStatus)
  return (
    <div>
       <Table>
        
        <TableHeader className=''>
          <TableRow >
            <TableHead className='w-[50px]'>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">
              Payment status
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              Delivery Status
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Date
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order,_)=>(
    <TableRow key={order.id} className="bg-accent text-muted-foreground">
    <TableCell className='text-muted-foreground flex flex-wrap'>
      <div className="font-semibold text-blue-500">{order.user.firstName} {order.user.lastName}</div>
      <div className="hidden text-sm text-muted-foreground md:inline">
       {order.user.email}
      </div>
    </TableCell>
    <TableCell className="hidden sm:table-cell">
   <PaymentStatus status={order.status ?? "pending"} />
    </TableCell>
    <TableCell className="hidden sm:table-cell">
      <DeliveryStatusOrder status={order.deliveryStatus ?? "pending"} />
    
    </TableCell>
    <TableCell className="hidden md:table-cell">
      {formatDateToLocal(order.createdDate.toDateString())}
    </TableCell>
    <TableCell className="text-right">{formatPrice(order.amount)}</TableCell>
  </TableRow>
          ))}
      
          {/* <TableRow className="bg-accent text-muted-foreground">
            <TableCell className='text-muted-foreground'>
              <div className="font-semibold text-blue-500">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
           <PaymentStatus status={"pending"} />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <DeliveryStatusOrder status="Delivered" />
            
            </TableCell>
            <TableCell className="hidden md:table-cell">
              2023-06-23
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow> */}
         
        </TableBody>
      </Table>
      <PaginationTable totalPages={totalPages} />
    </div>
   
  )
}


