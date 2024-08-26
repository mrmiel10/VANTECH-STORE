"use client"
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { DeliveryStatusOrder } from './DeliveryStatusOrder';
  import {User,Order as typeOrder } from '@prisma/client';
import PaymentStatus from './PaymentStatus';
import { formatPrice } from '@/lib/formatPrice';
import { useOrderStore } from '@/lib/order.store';
import { setOrder } from '@/lib/order.store';
import { formatDateToLocal } from '@/lib/formatDate';
const RowOrder = ({order,lastOrder}:{
 
  order:typeOrder & {user:User},
  lastOrder:typeOrder & ({user:User}) | null
}) => {
  // const [orderDetail, setOrderDetail] = React.useState<typeOrder & ({user:User}) | null>(lastOrder)
  useEffect(()=>{
setOrder(lastOrder)
  },[lastOrder])
  return (
    <TableRow onClick={()=>{
      setOrder(order)
    }} key={order.id} className="bg-accent text-muted-foreground">
    <TableCell className='text-muted-foreground flex flex-wrap'>
      <div className="font-semibold text-blue-500">{order.user.firstName} {order.user.lastName}</div>
      <div className="hidden text-sm text-muted-foreground md:inline">
       {order.user.email}
      </div>
    </TableCell>
    <TableCell className="hidden sm:table-cell">
   <PaymentStatus status={order.status} />
    </TableCell>
    <TableCell className="hidden sm:table-cell">
      <DeliveryStatusOrder status={order.deliveryStatus} />
    
    </TableCell>
    <TableCell className="hidden md:table-cell">
      {formatDateToLocal(order.createdDate.toDateString())}
    </TableCell>
    <TableCell className="text-right">{formatPrice(order.amount)}</TableCell>
  </TableRow>
  )
}

export default RowOrder