"use client"
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "next/navigation";

import { useQueryState } from "nuqs";
import clsx from "clsx";
import { TitleFilterOrder } from "./SelectFilterPaymentStatusOrderUser";
import { MapDeliveryStatusOrder } from "@/lib/utils";
export const SelectFilterDeliveryStatusOrderUser = () => {
  const [deliveryStatus, setDeliveryStatus] = useQueryState("deliveryStatus", {
    defaultValue: "",
    shallow: false,
  });
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-1 ">
   <TitleFilterOrder title="deliveryStatus" />
      <Select  onValueChange={(value) => value.toLowerCase() === "all" ? setDeliveryStatus("") : setDeliveryStatus(value)}>
        <SelectTrigger id="category" aria-label="All">
          <SelectValue placeholder="All products" className="w-full" />
        </SelectTrigger>
        <SelectContent id="category">
          <SelectItem  value="all">
            All orders
          </SelectItem>
          {MapDeliveryStatusOrder.map((status, _) => (
            <SelectItem 
            key={status}
            className={clsx(
                {"bg-muted": searchParams.has("deliveryStatus",status)}
            )}
              value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
