import {
  File,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CardWeekOrMonthOrders,
} from "../../../../components/admin/orders/CardOrders";
import { FilterDeliveryStatusOrder } from "./FilterDeliveryStatusOrder";
import { OrdersTableAdmin } from "./OrdersTableAdmin";
import { AdminSearch } from "../../../../components/admin/AdminSearch";
import { Suspense } from "react";
import { PageProps, searchParamsCache } from "@/lib/utils";
import {OrderDetails} from "./OrderDetails";
import { SkeletonLoadingCardOrder, SkeletonLoadingOrdersTable } from "../../../../components/Skeletons";

import { ShowingNumberOrders } from "./ShowingNumberOrders";
export default function OrdersPage({
  params,
  searchParams,
}: PageProps) {
   const paramSearch = searchParamsCache.parse(searchParams);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="text-blue-500 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <Suspense fallback={<SkeletonLoadingCardOrder description={"All"} />}>
          <CardWeekOrMonthOrders name="all" description="All" />
          </Suspense>
          <Suspense fallback={<SkeletonLoadingCardOrder description={"This Week"} />}>
          <CardWeekOrMonthOrders name="week" description="This week" />
          </Suspense>
          <Suspense fallback={<SkeletonLoadingCardOrder description={"This Month"} />}>
          <CardWeekOrMonthOrders name="month" description="This month" />
          </Suspense>
       
       
                 
        </div>
        <AdminSearch placeholder="search order..." />
        <Tabs defaultValue="all">
          <div className="flex items-center text-muted-foreground">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <FilterDeliveryStatusOrder />
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm hover:text-blue-500"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader className="px-7">
                <CardTitle className="text-blue-500">Orders</CardTitle>
                <CardDescription>
                  Manage your orders from your store
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={ <SkeletonLoadingOrdersTable />} >
                <OrdersTableAdmin />
                
                </Suspense>
              
              </CardContent>
              <CardFooter>
               <ShowingNumberOrders  />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div>
     <OrderDetails />
      </div>
    </main>
  );
}
