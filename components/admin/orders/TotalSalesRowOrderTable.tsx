import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ParseProducts } from '@/lib/ParseProducts'
import React from 'react'
import prisma from '../../../db'

export const TotalSalesRowOrderTable = async({productId}:{productId:string}) => {
    const totalSales =  (await prisma.order.findMany()).reduce((acc,cmd)=>{
        const products = ParseProducts(cmd.products)
        return acc + products.filter((p) =>p.id === productId).length
      },0)
    return (
        <DropdownMenuItem className="focus:bg-transparent">
                   {totalSales === 0  ? (
    <div>There are no sales yet</div>
    ):(
    <div className="">
      
      {totalSales < 10 ? "0" + totalSales : totalSales}{" "}sales</div>
    )}
                      </DropdownMenuItem>
      )
}
