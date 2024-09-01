import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export const SkeletonTopCardDashboard = ({
  title,
  Icon,
}: {
  title: string;
  Icon: LucideIcon;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-48" />
      </CardContent>
    </Card>
  );
};
export const SkeletonDashboardSalesDetails = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-blue-500">More sales details</CardTitle>
          <CardDescription>
            See paid and unpaid orders of the sales
          </CardDescription>
        </div>
        <Button
          variant={"defaultBtn"}
          asChild
          size="sm"
          className="ml-auto gap-1 hover:translate-x-1 hover:-translate-y-1 transition-all ease duration-100"
        >
          <Link href="/admin/orders">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="">
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-28 h-6" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-28 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const SkeletonCardDashboardProductDetails = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-blue-500">More product details</CardTitle>
          <CardDescription>
            See published,archive and draft products
          </CardDescription>
        </div>
        <Button
          variant={"defaultBtn"}
          asChild
          size="sm"
          className="ml-auto gap-1 hover:translate-x-1 hover:-translate-y-1 transition-all ease duration-100"
        >
          <Link href="/admin/manage-products">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full flex gap-4">
          <div className="grid gap-2 flex-1">
            <div className="text-green-500">Published</div>
            <div className="grid gap-1">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>

          <div className="grid gap-2 flex-1">
            <div className="text-green-500">Archive</div>
            <div className="grid gap-1">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>

          <div className="grid gap-2 flex-1">
            <div className="text-green-500">Draft</div>
            <div className="grid gap-1">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const SkeletonCardDashboardRecentSales = () => {
  const SkeletonsSalesDetails = Array.from({ length: 5 }, (_, i) => (
    <RowSkeletonCardDashboardRecentSales key={i} />
  ));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-500">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">{SkeletonsSalesDetails}</CardContent>
    </Card>
  );
};
export const RowSkeletonCardDashboardRecentSales = () => {
  return (
    <div className="flex  gap-4 items-center">
      <Skeleton className="size-9 rounded-full " />

      <div className="grid gap-1">
        <Skeleton className="w-28 h-3" />
        <Skeleton className="w-44 h-3" />
      </div>
      <Skeleton className="ml-auto w-24 h-6" />
    </div>
  );
};
