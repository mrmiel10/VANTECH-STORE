"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { ListFilter } from "lucide-react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { MapDeliveryStatusOrder } from "@/lib/utils";

export const FilterDeliveryStatusOrder = () => {
  const searchParams = useSearchParams();
  const [deliveryStatus, setDeliveryStatus] = useQueryState("deliveryStatus", {
    defaultValue: "",
    shallow: false,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="focus:ring-0 h-7 gap-1 text-sm hover:text-blue-500 focus-visible:text-blue-500"
        >
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-blue-500">
          Filter by
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MapDeliveryStatusOrder.map((status, _) => (
          <DropdownMenuCheckboxItem
            key={status}
            className={clsx(
              searchParams.has("status", status) &&
                "bg-muted text-blue-500 pointer-events-none"
            )}
            checked={searchParams.has("deliveryStatus", status)}
            onCheckedChange={(checked) =>
              checked
                ? setDeliveryStatus(status)
                : setDeliveryStatus("")
            }
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
