
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  MoreVertical,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
// import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DeliveryStatusOrder } from "../../../../components/admin/orders/DeliveryStatusOrder";
import {
  CardAllOrders,
  CardMonthOrders,
  CardWeekOrders,
} from "../../../../components/admin/orders/CardOrders";
import { FilterDeliveryStatusOrder } from "../../../../components/admin/orders/FilterDeliveryStatusOrder";
import { OrdersTableAdmin } from "../../../../components/admin/orders/OrdersTableAdmin";
import { AdminSearch } from "../../../../components/admin/AdminSearch";
import PaymentStatus from "../../../../components/admin/orders/PaymentStatus";
import { HandleSetDeliveryOrderStatus } from "../../../../components/admin/orders/HandleSetDeliveryOrderStatus";

import { useEffect } from "react";

import { searchParamsCache } from "@/lib/nuqs";
import OrderDetails from "./OrderDetails";
export default function OrdersPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
   const paramSearch = searchParamsCache.parse(searchParams);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="text-blue-500 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <CardAllOrders />
          <CardWeekOrders />
          <CardMonthOrders />
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
                <OrdersTableAdmin />
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> orders
                </div>
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
