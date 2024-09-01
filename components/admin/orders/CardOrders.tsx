import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/formatData";
import { Separator } from "@/components/ui/separator";
import prisma from "../../../db";
import {
  // getAllPaidOrUnpaidOrders,
  getAmountOrdersOfPeriod,
  getPaidOrUnpaidOrdersOfPeriod,
} from "@/lib/actions";
import { getStartAndEndOfPeriod } from "@/lib/getStartAndEndOfPeriod";


export const CardWeekOrMonthOrders = async({name,description}:{
  name:"week" | "month" | "all",
  description:string
}) =>{
  const {start,end} = getStartAndEndOfPeriod(name)
  const {amountOrders:amountPaidOrders,totalOrders:totalPaidOrders} = await getPaidOrUnpaidOrdersOfPeriod("paid",start,end);
  const {amountOrders:amountUnpaidOrders,totalOrders:totalUnpaidOrders} = await getPaidOrUnpaidOrdersOfPeriod("pending",start,end);
  const totalAmountOrders = await getAmountOrdersOfPeriod(start,end);
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className=" text-3xl md:text-4xl text-blue-500">
      
          {formatPrice(totalAmountOrders ?? 0)}
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <div className="max-md:gap-4 gap-8 flex flex-row items-stretch text-muted-foreground text-sm">
          <div className="flex-1 flex flex-col self-end">
            
              {!amountPaidOrders || totalPaidOrders === 0 ? (
               <div>you have no paid orders yet</div> 
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                  
                    {totalPaidOrders} paid orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountPaidOrders )}
                  </div>
                </div>
              )}
         
          </div>
          <Separator orientation="vertical" className="h-full min-h-12" />
          <div className="flex-1 flex flex-col">
           
              {!amountUnpaidOrders ||
             totalUnpaidOrders === 0 ? (
               <div>you have no unpaid orders</div>
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                 
                    { totalUnpaidOrders} unpaid orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountUnpaidOrders!)}{" "}
                    {/* $122,99 */}
                  </div>
                </div>
              )}
          
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
