"use client"
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import clsx from "clsx";
import { TitleFilterOrder } from "./SelectFilterPaymentStatusOrderUser";
export const SelectFilterDateOrderUser = () => {
  const [orderDate, setOrderDate] = useQueryState("orderDate", {
    defaultValue: "",
    shallow: false,
  });
  const searchParams = useSearchParams();
  const orderByDate = [
    {
      oldest:"oldest last",
      value:"asc"
    },
    {
      oldest:"oldest first",
      value:"desc"
    }
  ]
  const handleFilterChange = (value: string) => {
    console.log(value);
   
    const params = new URLSearchParams(searchParams.toString());
      setOrderDate(value)
  };
  return (
    <div className="flex flex-col gap-1 flex-shrink">
     <TitleFilterOrder title="order" />
      <Select  onValueChange={(value) => handleFilterChange(value)}>
        <SelectTrigger id="paymentStatus" aria-label="All">
          <SelectValue placeholder="oldest last" className="w-full" />
        </SelectTrigger>
        <SelectContent id="paymentStatus">
     
          {orderByDate.map((old, _) => (
            <SelectItem 
            key={old.oldest}
            className={clsx(
                {"bg-muted": searchParams.has("order",old.value)}
            )}
              value={old.value}>{old.oldest}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
