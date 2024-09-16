"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeliveryStatusOrder } from "./DeliveryStatusOrder";
import { User, Order as typeOrder } from "@prisma/client";

import { formatPrice } from "@/lib/utils";
import { useOrderStore } from "@/lib/order.store";

import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import { setOrder } from "@/lib/order.store";
import { getInitials } from "@/app/UserNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const RowOrder = ({
  order,
  lastOrder,
}: {
  order: typeOrder & { user: User };
  lastOrder: (typeOrder & { user: User }) | null;
}) => {
  const { order: orderDetail } = useOrderStore(
    useShallow((s) => ({
      order: s.order,
    }))
  );

  // const [orderDetail, setOrderDetail] = React.useState<typeOrder & ({user:User}) | null>(lastOrder)
  useEffect(() => {
    setOrder(lastOrder);
  }, [lastOrder]);
  return (
    <TableRow
      onClick={() => {
        setOrder(order);
      }}
      key={order.id}
      className={clsx(" text-muted-foreground", {
        "bg-accent": order === orderDetail,
      })}
    >
      <TableCell className="text-muted-foreground">
        <div className="flex w-full gap-2">
          <Avatar>
            <AvatarImage
              alt="image user"
              src={order.user.picture}
              width={25}
              height={25}
              className="rounded-full aspect-square object-cover"
            ></AvatarImage>
            <AvatarFallback>
              {getInitials(order.user.firstName, order.user.lastName, order.user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-blue-500">
              {order.user.firstName} {order.user.lastName}
            </div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {order.user.email}
            </div>
          </div>
        </div>
      </TableCell>
      {/* <TableCell className="hidden sm:table-cell">
   <PaymentStatus status={order.status} />
    </TableCell> */}
      <TableCell className="hidden sm:table-cell">
        <DeliveryStatusOrder status={order.deliveryStatus} />
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">
      {formatDateToLocal(order.createdDate.toDateString())
    </TableCell> */}
      <TableCell className="text-right">{formatPrice(order.amount)}</TableCell>
    </TableRow>
  );
};

export default RowOrder;
