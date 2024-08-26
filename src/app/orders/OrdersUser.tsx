import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import PaymentStatus from '../../../components/admin/orders/PaymentStatus';
import { DeliveryStatusOrder } from '../../../components/admin/orders/DeliveryStatusOrder';
const OrdersUser = () => {
  return (
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

  
       <TableRow className="bg-accent text-muted-foreground">
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
      </TableRow> 
     
       <TableRow className="bg-accent text-muted-foreground">
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
      </TableRow> 
     
    </TableBody>
  </Table>
  )
}

export default OrdersUser