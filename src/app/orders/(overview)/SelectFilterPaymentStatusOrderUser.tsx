"use client";
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
export const SelectFilterPaymentStatusUser = () => {
  const [paymentStatus, setPaymentStatus] = useQueryState("paymentStatus", {
    defaultValue: "",
    shallow: false,
  });
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-1">
      <TitleFilterOrder title="paymentStatus" />
      <Select
        onValueChange={(value) =>
          value.toLowerCase() === "all"
            ? setPaymentStatus("")
            : setPaymentStatus(value)
        }
      >
        <SelectTrigger id="paymentStatus" aria-label="All">
          <SelectValue placeholder="All products" className="w-full" />
        </SelectTrigger>
        <SelectContent id="paymentStatus">
          <SelectItem value="all">All orders</SelectItem>
          {["Pending", "Paid"].map((status, _) => (
            <SelectItem
              key={status}
              className={clsx({
                "bg-muted": searchParams.has("paymentStatus", status),
              })}
              value={status}
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export const TitleFilterOrder = ({ title }: { title: string }) => {
  return <div className="text-sm font-semibold text-blue-500">{title}</div>;
};
