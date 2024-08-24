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
export const CardAllOrders = async () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="max-w-lg text-balance ">
          All
        </CardDescription>
        <CardTitle className="text-blue-500 text-4xl">
          {/* <Card className="h-16 w-52 flex justify-center items-center text-blue-500 antialiased border-2 border-blue-500 ">192 Orders</Card> */}
          192 orders
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className=" max-md:gap-4 gap-8 flex flex-row items-stretch text-muted-foreground text-sm">
        <div className="flex-1 flex flex-col  text-muted-foreground  border-muted  ">
            {" "}
            <div> 50 unpaid orders </div>
            <div className="mt-auto font-semibold text-blue-500 text-xs ">
              {formatPrice(1227514)}
            </div>
          </div>
          <Separator orientation="vertical" className="h-full min-h-12" />
          <div className="flex-1 flex flex-col  text-muted-foreground  border-muted  ">
            {" "}
            <div> 50 unpaid orders </div>
            <div className="mt-auto font-semibold text-blue-500 text-xs ">
              {formatPrice(1227514)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export const CardWeekOrders = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl text-blue-500">$1,329</CardTitle>
      </CardHeader>

      <CardFooter>
        <div className="grid grid-cols-2 gap-1 text-muted-foreground text-sm">
          <div className="grid grid-cols-1">
            <div> 50 unpaid orders </div>

            <div className="font-semibold text-blue-500 text-xs">$122,99</div>
          </div>
          <div className="grid grid-cols-1">
            50 paid orders{" "}
            <span className="font-semibold text-blue-500 text-xs">$122,99</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export const CardMonthOrders = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Month</CardDescription>
        <CardTitle className="text-4xl text-blue-500">$5,329</CardTitle>
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
        <div className="grid grid-cols-2 gap-1 text-muted-foreground text-sm">
          <div className="grid grid-cols-1">
            <div> 50 unpaid orders </div>

            <div className="font-semibold text-blue-500 text-xs">$122,99</div>
          </div>
          <div className="grid grid-cols-1">
            50 paid orders{" "}
            <span className="font-semibold text-blue-500 text-xs">$122,99</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
