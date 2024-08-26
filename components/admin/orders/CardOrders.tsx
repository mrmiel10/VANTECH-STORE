import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { Separator } from "@/components/ui/separator";
import prisma from "../../../db";
import {
  getAllPaidOrUnpaidOrders,
  getAmountOrdersInMonth,
  getAmountOrdersInWeek,
  getPaidOrUnpaidOrdersInMonth,
  getPaidOrUnpaidOrdersInWeek,
} from "@/lib/actions";

export const CardAllOrders = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const countAllOrders = await prisma.order.count();
  const { _count: countPaidOrders, _sum: amountPaidOrders } =
    await getAllPaidOrUnpaidOrders("paid");
  const { _count: countUnpaidOrders, _sum: amountUnpaidOrders } =
    await getAllPaidOrUnpaidOrders("pending");
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="max-w-lg text-balance ">
          All
        </CardDescription>
        <CardTitle className="text-blue-500 text-4xl">
          {/* <Card className="h-16 w-52 flex justify-center items-center text-blue-500 antialiased border-2 border-blue-500 ">192 Orders</Card> */}
          {countAllOrders} orders
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className=" max-md:gap-4 gap-8 flex flex-row items-stretch text-muted-foreground text-sm">
          <div className="flex-1 flex flex-col self-end  ">
            {" "}
            {!amountPaidOrders.amount ||
              countPaidOrders === 0 ? (
                <div>you have no paid orders yet</div>
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                  
                    {countPaidOrders} paid orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountPaidOrders.amount!)}{" "}
                
                  </div>
                </div>
              )}
          
          </div>
          <Separator orientation="vertical" className="h-full min-h-12" />
          <div className="flex-1 flex flex-col  text-muted-foreground  border-muted  ">
            {" "}
            {!amountUnpaidOrders.amount ||
              countUnpaidOrders === 0 ? (
                <div>you have no unpaid orders</div>
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                  
                    {countUnpaidOrders} unpaid orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountUnpaidOrders.amount!)}{" "}
                
                  </div>
                </div>
              )}
          
       
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export const CardWeekOrders = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const amountOrdersInWeek = await getAmountOrdersInWeek();
  const { _count: countPaidOrdersInWeek, _sum: amountPaidOrdersInWeek } =
    await getPaidOrUnpaidOrdersInWeek("paid");
  const { _count: countUnpaidOrdersInWeek, _sum: amountUnpaidOrdersInWeek } =
    await getPaidOrUnpaidOrdersInWeek("pending");
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl text-blue-500">
      
          {formatPrice(amountOrdersInWeek ?? 0)}
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <div className="max-md:gap-4 gap-8 flex flex-row items-stretch text-muted-foreground text-sm">
          <div className="flex-1 flex flex-col self-end">
            
              {!amountPaidOrdersInWeek.amount || countPaidOrdersInWeek === 0 ? (
               <div>you have no paid orders yet</div> 
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                  
                    {countPaidOrdersInWeek} paid orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountPaidOrdersInWeek.amount)} {/* $122,99 */}
                  </div>
                </div>
              )}
         
          </div>
          <Separator orientation="vertical" className="h-full min-h-12" />
          <div className="flex-1 flex flex-col">
           
              {!amountUnpaidOrdersInWeek.amount ||
              countUnpaidOrdersInWeek === 0 ? (
               <div>you have no unpaid orders</div>
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                 
                    {countUnpaidOrdersInWeek} unpaid orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountUnpaidOrdersInWeek.amount!)}{" "}
                    {/* $122,99 */}
                  </div>
                </div>
              )}
          
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export const CardMonthOrders = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const amountOrdersInMonth = await getAmountOrdersInMonth();
  const { _count: countPaidOrdersInMonth, _sum: amountPaidOrdersInMonth } =
    await getPaidOrUnpaidOrdersInMonth("paid");
  const { _count: countUnpaidOrdersInMonth, _sum: amountUnpaidOrdersInMonth } =
    await getPaidOrUnpaidOrdersInMonth("pending");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Month</CardDescription>
        <CardTitle className="text-4xl text-blue-500">
          {formatPrice(amountOrdersInMonth ?? 0)}
        </CardTitle>
      </CardHeader>
      {/* <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter> */}
      <CardFooter>
        <div className="max-md:gap-4 gap-8 flex flex-row items-stretch text-muted-foreground text-sm">
          <div className="flex-1 flex flex-col self-end">
            {!amountPaidOrdersInMonth.amount || countPaidOrdersInMonth === 0 ? (
            <div>you have no paid orders yet</div>
            ) : (
              <div className="grid grid-cols-1">
                <div>
                
                  {countPaidOrdersInMonth} orders
                </div>

                <div className="font-semibold text-blue-500 text-xs">
                  {formatPrice(amountPaidOrdersInMonth.amount!)}{" "}
                </div>
              </div>
            )
            }
          </div>
          
          <Separator orientation="vertical" className="h-full min-h-12" />
          <div className="flex-1 flex flex-col"> 
                          
              {!amountUnpaidOrdersInMonth.amount ||
              countUnpaidOrdersInMonth === 0 ? (
                <div>you have no unpaid orders yet</div>
              ) : (
                <div className="grid grid-cols-1 h-full">
                  <div>
                    {/* 50 unpaid orders  */}
                    {countUnpaidOrdersInMonth} orders
                  </div>

                  <div className="flex self-end font-semibold text-blue-500 text-xs">
                    {formatPrice(amountUnpaidOrdersInMonth.amount!)}{" "}
                    {/* $122,99 */}
                  </div>
                </div>
              )}
         
            </div>
          </div>
      
      </CardFooter>
    </Card>
  );
};
