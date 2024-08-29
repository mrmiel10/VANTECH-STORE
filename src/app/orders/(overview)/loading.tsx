import React from 'react'
import { AdminSearch } from "../../../../components/admin/AdminSearch";



import { SelectFilterDeliveryStatusOrderUser } from "../../../../components/SelectFilterDeliveryStatusOrderUser";
import { MapDeliveryStatusOrder } from "../../../../components/admin/orders/FilterDeliveryStatusOrder";
import { SelectFilterPaymentStatusUser } from "../../../../components/orderUser/SelectFilterPaymentStatusOrderUser";
import { SelectFilterDateOrderUser } from "../../../../components/orderUser/SelectFilterDateOrderUser";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonLoadingOrdersUser } from '../../../../components/Skeletons';
const loading = () => {
  return (
    <div className="container flex flex-col gap-8 justify-center items-center px-5 md:px-10 py-10 md:py-20 max-w-5xl">
    <div className="text-4xl max-md:text-3xl font-bold text-blue-500">View yours orders and track your shipments</div>
    <AdminSearch placeholder="search your order..." />
  
    <div className="w-full grid gap-2">
    <div className="w-full">
      <div className=" gap-4 w-full  py-2 text-muted-foreground flex">
        <SelectFilterDateOrderUser />
        <SelectFilterPaymentStatusUser />
        <SelectFilterDeliveryStatusOrderUser />
      </div>
    </div>
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-blue-500 ">Yours orders</CardTitle>
        <CardDescription>
        Check your orders history
        </CardDescription>
      </CardHeader>
      <CardContent>
     
        <SkeletonLoadingOrdersUser />   
          
      </CardContent>
      <CardFooter>
        <Skeleton className='w-32 h-5' />
      </CardFooter>
    </Card>
    </div>
 
  </div>
);
  
}

export default loading