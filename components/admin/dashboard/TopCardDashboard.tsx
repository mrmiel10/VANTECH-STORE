import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { LucideIcon } from 'lucide-react';
  import prisma from '../../../db';
import { formatPrice } from '@/lib/formatData';
export const CardRevenue = async(

    {title,Icon}:{
      title:string,
      Icon:LucideIcon
    }
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 20000));
        const thisYear = new Date().getFullYear()
        const thisMonth = new Date().getMonth()
        const {_sum:start} = await prisma.order.aggregate({
            where:{
                createdDate:{
                    gte:new Date(thisYear,thisMonth,1),
                    lte: new Date(thisYear,thisMonth + 1,0)
                }
            },
            _sum:{
                amount:true
            }
           })
        const {_sum:end} = await prisma.order.aggregate({
            where:{
                createdDate:{
                    gte:new Date(thisYear,thisMonth - 1,1),
                    lte: new Date(thisYear,thisMonth ,0)
                }
            },
            _sum:{
                amount:true
            }
           })
        const {_sum:order} = await prisma.order.aggregate({
            _sum:{
                amount:true
            }
           
        })
        // const rate = (end - start) * (100/start)
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="size-4 text-muted-foreground" />
            {/* <DollarSign className="size-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            {!order.amount  ? (
                <div className="text-2xl font-bold text-blue-500">No orders have been placed yet</div>
               
            ):(
                <>
                  <div className="text-2xl font-bold text-blue-500">{formatPrice(order.amount)}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
                </>
              
            )}
                
              </CardContent>
        </Card>
      );
    };
export const CardCustomers = async(
    {title,Icon}:{
      title:string,
      Icon:LucideIcon
    }
    ) => {
        const {_count:totalCustomers} = await prisma.user.aggregate({
            _count:true
        })
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="size-4 text-muted-foreground" />
            {/* <DollarSign className="size-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
                <div className="text-2xl font-bold text-blue-500">{totalCustomers < 10 ? "0" + totalCustomers : totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
        </Card>
      );
    };
export const CardSales = async(
    {title,Icon}:{
      title:string,
      Icon:LucideIcon
    }
    ) => {
        const {_count:totalSales} = await prisma.order.aggregate({
            _count:true
        })
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="size-4 text-muted-foreground" />
            {/* <DollarSign className="size-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
                <div className="text-2xl font-bold text-blue-500">{totalSales < 10 ? "0" + totalSales : totalSales}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
        </Card>
      );
    };
export const CardProducts = async(
    {title,Icon}:{
      title:string,
      Icon:LucideIcon
    }
    ) => {
        const {_count:totalProducts} = await prisma.product.aggregate({
             _count:true
        })
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="size-4 text-muted-foreground" />
            {/* <DollarSign className="size-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
                <div className="text-2xl font-bold text-blue-500">{totalProducts < 10 ? "0" + totalProducts : totalProducts}{" "}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
        </Card>
      );
    };
