import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CreditCard, Users, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Package } from "lucide-react";
import {
  CardRevenue,
  CardSales,
  CardProducts,
  CardCustomers,
} from "./TopCardDashboard";
import prisma from "../../../../db";
import { getInitials } from "../../UserNav";
import { formatPrice } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
import {
  SkeletonCardDashboardProductDetails,
  SkeletonCardDashboardRecentSales,
  SkeletonDashboardSalesDetails,
  SkeletonTopCardDashboard,
} from "./Skeletons";

const DashboardPage = () => {
  return (
    <section className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Suspense
          fallback={
            <SkeletonTopCardDashboard title="Total Revenue" Icon={Wallet} />
          }
        >
          <CardRevenue title="Total Revenue" Icon={Wallet} />
        </Suspense>
        <Suspense
          fallback={<SkeletonTopCardDashboard title="Customers" Icon={Users} />}
        >
          <CardCustomers title="Customers" Icon={Users} />
        </Suspense>
        <Suspense
          fallback={
            <SkeletonTopCardDashboard title="Total Sales" Icon={CreditCard} />
          }
        >
          <CardSales title="Total Sales" Icon={CreditCard} />
        </Suspense>
        <Suspense
          fallback={
            <SkeletonTopCardDashboard title="Products" Icon={Package} />
          }
        >
          <CardProducts title="Products" Icon={Package} />
        </Suspense>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <div className="grid grd-cols-1 gap-8">
          <Suspense fallback={<SkeletonDashboardSalesDetails />}>
            <CardDetailsSales />
          </Suspense>
          <Suspense fallback={<SkeletonCardDashboardProductDetails />}>
            <CardDetailsProducts />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<SkeletonCardDashboardRecentSales />}>
            <CardRecentSales />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
const CardRecentSales = async () => {
  //await new Promise((resolve) => setTimeout(resolve, 20000));
  const recentSales = await prisma.order.findMany({
    orderBy: {
      createdDate: "desc",
    },
    take: 5,
    select: {
      amount: true,
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          picture: true,
        },
      },
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-500">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {recentSales.map((sale, _) => (
          <div key={sale.user.id} className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage
                src={sale.user.picture}
                alt="Avatar"
                className="object-cover"
              />
              <AvatarFallback className="text-blue-500">
                {getInitials(
                  sale.user.firstName,
                  sale.user.lastName,
                  sale.user.email
                )}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {sale.user.firstName} {sale.user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{sale.user.email}</p>
            </div>
            <div className="ml-auto font-medium text-blue-500">
              {formatPrice(sale.amount)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
const CardDetailsSales = async () => {
  //await new Promise((resolve) => setTimeout(resolve, 20000));
  const dp = await prisma.product.groupBy({
    by: ["status", "price", "quantity"],
    _count: true,
  });
  console.log("dp,", dp);
  const { _count: totalPaidOrders, _sum: totalAmountPaidOrders } =
    await prisma.order.aggregate({
      where: {
        status: {
          equals: "paid",
          mode: "insensitive",
        },
      },
      _count: true,
      _sum: {
        amount: true,
      },
    });
  const { _count: totalUnpaidOrders, _sum: totalAmountUnpaidOrders } =
    await prisma.order.aggregate({
      where: {
        status: {
          equals: "pending",
          mode: "insensitive",
        },
      },
      _count: true,
      _sum: {
        amount: true,
      },
    });
  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle className="text-blue-500">
          <div>
            <Link
              href="/admin/orders"
              className="flex group border-none gap-2 transition-colors"
            >
              <span> More sales details</span>
              <ArrowUpRight
                size={16}
                className=" group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </Link>
          </div>
        </CardTitle>
        <CardDescription>
          See paid and unpaid orders of the sales
        </CardDescription>

        {/* <Button
          variant={"defaultBtn"}
          asChild
          size="sm"
          className="ml-auto gap-1 hover:translate-x-1 hover:-translate-y-1 transition-all ease duration-100"
        >
          <Link href="/admin/orders">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent className="">
        <div className="grid gap-2">
          <div className="flex justify-between">
            {totalPaidOrders === 0 ? (
              <div>No paid orders yet</div>
            ) : (
              <>
                <div>{formatNumber(totalPaidOrders)} paid orders</div>
                <div>{formatPrice(totalAmountPaidOrders.amount ?? 0)}</div>
              </>
            )}
          </div>
          <div className="flex justify-between">
            {totalUnpaidOrders === 0 ? (
              <div>No unpaid orders yet</div>
            ) : (
              <>
                <div>{formatNumber(totalUnpaidOrders)} unpaid orders</div>
                <div>{formatPrice(totalAmountUnpaidOrders.amount ?? 0)}</div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const CardDetailsProducts = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 20000));
  const dp = await prisma.product.groupBy({
    by: ["status", "price", "quantity", "id"],
    _count: true,
  });
  // console.log("dp,", dpd);
  const draftProduct = dp
    .filter((p, _) => p.status.toLowerCase() === "draft")
    .reduce(
      (acc, item) => {
        const product = item;
        acc.count++;
        acc.totalAmount += product.price * product.quantity;
        return acc;
      },
      { count: 0, totalAmount: 0 }
    );
  const publishedProduct = dp
    ?.filter((p, _) => p.status.toLowerCase() === "published")
    .reduce(
      (acc, item) => {
        const product = item;
        acc.count++;
        acc.totalAmount += product.price * product.quantity;
        return acc;
      },
      { count: 0, totalAmount: 0 }
    );
  const archiveProduct = dp
    ?.filter((p, _) => p.status.toLowerCase() === "archive")
    .reduce(
      (acc, item) => {
        const product = item;
        acc.count++;
        acc.totalAmount += product.price * product.quantity;
        return acc;
      },
      { count: 0, totalAmount: 0 }
    );
  return (
    <Card>
      <CardHeader className="flex ">
        <div className="grid gap-2">
          <CardTitle className="text-blue-500">
            <div>
              <Link
                href="/admin/manage-products"
                className="flex group border-none gap-2 transition-colors"
              >
                <span>More product details</span>
                <ArrowUpRight
                  size={16}
                  className=" group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
            </div>
          </CardTitle>
          <CardDescription>
            See published,archive and draft products
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full grid gap-2 flex-wrap">
          {publishedProduct.count === 0 ? (
            <div>No product yet in published products</div>
          ) : (
            <div>
              {" "}
              <span className="font-semibold text-blue-500">
                {" "}
                {formatNumber(publishedProduct.count)} products
              </span>{" "}
              in <span>published{" "} </span>
              products
            </div>
          )}

          {archiveProduct.count === 0 ? (
            <div>No product yet in archive products</div>
          ) : (
            <div>
              {" "}
              {formatNumber(archiveProduct.count)} products in published
              products
            </div>
          )}

          {draftProduct.count === 0 ? (
            <div>No product yet in draft products</div>
          ) : (
            <div>
              {" "}
              {formatNumber(draftProduct.count)} products in published products
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
