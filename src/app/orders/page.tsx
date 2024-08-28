
import React from "react";
import { AdminSearch } from "../../../components/admin/AdminSearch";
import OrdersUser from "./OrdersUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectFilterDeliveryStatusOrderUser } from "../../../components/SelectFilterDeliveryStatusOrderUser";
import { MapDeliveryStatusOrder } from "../../../components/admin/orders/FilterDeliveryStatusOrder";
import { SelectFilterPaymentStatusUser } from "../../../components/orderUser/SelectFilterPaymentStatusOrderUser";
import { SelectFilterDateOrderUser } from "../../../components/orderUser/SelectFilterDateOrderUser";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { searchParamsCache } from "@/lib/nuqs";
import prisma from "../../../db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import orderempty from "../../../public/order.png"
import { MoveLeft } from "lucide-react";

const PageOrderUser = async(
  {
    searchParams,
  }: {
    searchParams: {
      deliveryStatus?:string,
      paymentStatus?:string,
      search?:string,
      page?:string
    }
  }
) => {
  const paramSearch = searchParamsCache.parse(searchParams);
  const user = await getCurrentUser()
  if(!user) redirect("/")
  const orders = await prisma.order.count({
where:{
  userId:user.id
}
  })
  if(!orders || orders === 0) return (
  <div className="container flex flex-col gap-8 justify-center items-center px-5 md:px-10 py-10 md:py-20 max-w-5xl">
    <NoOrders />
  </div>
  )
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
          <OrdersUser />
        </CardContent>
        <CardFooter>{/* <ShowingNumberProducts /> */}</CardFooter>
      </Card>
      </div>
   
    </div>
  );
};

export default PageOrderUser;
const NoOrders = () =>{
  return (
    <Alert className="p-6">
      <div className="flex sm:items-stretch max-sm:flex-col items-center">
        <div className="relative w-64 aspect-squar">
          <Image src={orderempty} alt={"cartImage"} className="e object-contain" />
        </div>
        <div className="max-sm:self-stretch">
          <div className="h-full flex flex-col mt-8 max-sm:space-y-2 gap-4">
            <div className="text-lg space-y-2">
              <AlertTitle className="font-bold text-blue-500">
              You haven&apos;t placed any orders yet!
              </AlertTitle>
              <AlertDescription className="text-muted-foreground">
                Please back to add product in a cart
              </AlertDescription>
            </div>
            <Link href="/" className="flex gap-2 text-muted-foreground hover:text-blue-500"><MoveLeft className="" /> Back to home</Link>
          
          </div>
        </div>
      </div>
    </Alert>
  );
}