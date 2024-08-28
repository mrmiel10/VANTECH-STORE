"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useCallback } from "react";
import { ListFilter } from "lucide-react";
import clsx from "clsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from 'nuqs'
export const MapDeliveryStatusOrder = [
  "Delivered",
  "Pending",
  "Dispatched",
  "Cancelled",
];
export const FilterDeliveryStatusOrder = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [deliveryStatus,setDeliveryStatus] = useQueryState("deliveryStatus",{
    defaultValue:"",
    shallow:false,  
})
  const handleFilterChange = 
    (deliveryStatus: string, checked: CheckedState) => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        setDeliveryStatus(deliveryStatus)
     
      } else {
        setDeliveryStatus("")
      //  
      }
   
    }
  
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
        {MapDeliveryStatusOrder.map((deliverystatus, _) => (
          <DropdownMenuCheckboxItem
            key={deliverystatus}
            className={clsx(
              searchParams.has("status", deliverystatus) &&
                "bg-muted text-blue-500 pointer-events-none"
            )}
            checked={searchParams.has("deliveryStatus", deliverystatus)}
            onCheckedChange={(checked) =>
              handleFilterChange(deliverystatus, checked)
            }
          >
            {deliverystatus}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
