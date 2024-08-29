import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, CreditCard, Truck } from "lucide-react";
import { formatDateToLocal } from "@/lib/formatData";
import { formatPrice } from "@/lib/formatData";
import AccordionExample from "../../../../../components/Accordion";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import PaymentStatus from "../../../../../components/admin/orders/PaymentStatus";
import { DeliveryStatusOrder } from "../../../../../components/admin/orders/DeliveryStatusOrder";
import { Info } from "lucide-react";
import prisma from "../../../../../db";
import Image from "next/image";
import laptop from "../../../../../public/PC3.jpeg"
import { ParseProducts } from "@/lib/parseData";
import { ParseProductImages } from "@/lib/parseData";
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonRowOrderDetail } from '../../../../../components/Skeletons';
const loading = () => {
  const SkeletonOrderDetail = Array.from({length:3},(_,i)=>(
    <SkeletonRowOrderDetail key={i} />
  ))
    return (
        <div className="container text-muted-foreground flex flex-col gap-8 justify-center items-center px-5 md:px-10 py-10 md:py-20 max-w-5xl">
          <h1 className="text-blue-500 max-md:text-3xl text-4xl font-bold text-center">
            See your order details
          </h1>
    
          <Card className="w-full">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-500">
              
                <Info className="size-5 mr-1" />
              Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-500">
             
              <div className='flex gap-1'>
               <div> Order ID:{" "}</div>
             <Skeleton className='w-72 h-5' />
              </div>
              <div className='flex gap-1'>
               <div>Order date :{" "}</div>
               <Skeleton className='w-24 h-5' />
              </div>
           
            </CardContent>
          </Card>
    
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-500">
                <Package className="h-5 w-5 mr-1" />
                Products List
              </CardTitle>
            </CardHeader>
            <CardContent>
             
              <div className="grid gap-8">
       {SkeletonOrderDetail}
           
             
              </div>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-blue-500">
                  <div className="flex max-xs:flex-col justify-center xs:items-center mr-auto">
                    <CreditCard className="h-5 w-5 mr-1 max-xs:mb-1" />
                    Paymement status
                  </div>
    
                 <Skeleton className='w-22 h-5' />
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2">
                <li className="flex items-center justify-between">
                  <span className="">Subtotal</span>
                  <Skeleton className='w-28 h-6' />
                </li>
                <li className="flex items-center justify-between">
                  <span className="">Shipping</span>
                  <Skeleton className='w-14 h-6' />
                </li>
              
                <li className="text-blue-500 flex items-center justify-between font-semibold">
                  <span className="">Total</span>
                  <Skeleton className='w-28 h-6' />
                </li>
              </CardContent>
            </Card>
    
            <Card className="flex flex-col md:items-end w-full">
              <CardHeader className="w-full">
                <CardTitle className="text-blue-500 flex items-center gap-2">
                 <Skeleton className='w-24 h-5 rounded-full' />
                  <div className="flex max-xs:flex-col justify-center xs:items-center md:ml-auto ">
                    <Truck className="h-5 w-5 mr-1  max-xs:mb-1" />
                    <span>Delivery status</span>
                    
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      );
}

export default loading