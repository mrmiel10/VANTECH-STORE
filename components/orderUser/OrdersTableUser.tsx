import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import PaymentStatus from '../admin/orders/PaymentStatus';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { DeliveryStatusOrder } from '../admin/orders/DeliveryStatusOrder';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { formatPrice } from '@/lib/formatData';
import { ListOrderedIcon } from 'lucide-react';
import { CopyIdOrder } from '@/app/orders/CopyIdOrder';
export const OrdersTableUser = () => {
  return (
    <Table>
    <TableHeader className="">
      <TableRow>
        <TableHead className="">Date</TableHead>
        <TableHead className="">Payment status</TableHead>
        <TableHead className="">
          Delivery Status
        </TableHead>
    
        <TableHead className="text-right">Amount</TableHead>
        <TableHead className=""></TableHead>
      
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="bg-accent text-muted-foreground">
        <TableCell className="text-muted-foreground">2023-06-23</TableCell>
        <TableCell >
          <PaymentStatus status={"pending"} />
        </TableCell>
        <TableCell className="">
          <DeliveryStatusOrder status="Delivered" />
        </TableCell>
      
        <TableCell className="text-right">{formatPrice(250000)}</TableCell>
        <TableCell className="flex justify-end">
      <ActionsOrderUser />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  )
}

export const ActionsOrderUser = () =>{
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className=" text-muted-foreground "
        >
          {/* <DropdownMenuLabel className="text-blue-500">
            Others Features
          </DropdownMenuLabel> */}

          <DropdownMenuItem className="flex gap-1 items-center justify-center">
          <ListOrderedIcon className="size-5" />
          see order details
          </DropdownMenuItem>
        <CopyIdOrder />
        </DropdownMenuContent>
      </DropdownMenu>
    )
}