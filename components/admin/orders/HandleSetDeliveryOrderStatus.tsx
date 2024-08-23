"use client"
import React from "react";
import clsx from "clsx";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { handleSetDeliveryOrderStatusAction } from "@/lib/actions";
import { MapDeliveryStatusOrder } from "./FilterDeliveryStatusOrder";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
export const HandleSetDeliveryOrderStatus = ({
 orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const router = useRouter();
  const handleSetDeliveryOrderStatus = useServerAction(handleSetDeliveryOrderStatusAction, {
    onSuccess: () => {
      router.refresh();
      toast.success("the delivery status has been updated successfully");
    },
    onError: () => {
      toast.error("Not updated!");
    },
  });
  const deliveryStatus = status;
  return (
    <>
      <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="size-8 group"
                  >
                    <MoreVertical className="h-3.5 w-3.5 text-muted-foreground group-hover:text-blue-500" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel className="text-blue-500">
                    Set delivery Status
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {MapDeliveryStatusOrder.map((status, _) => (
        <div className="w-full space-y-2" key={status} >
          <DropdownMenuItem
          key={status}
            className={clsx(" h-10", {
              "bg-muted text-blue-500 pointer-events-none":
                deliveryStatus === status,
            })}
          >
            <form
              className="w-full"
              action={handleSetDeliveryOrderStatus.executeFormAction}
            >
              <input type="hidden" name="status" value={deliveryStatus} />
              {/* <input type="hidden" name="productId" value={productId} /> */}
              <Button variant={"pStatus"} className="p-0" type="submit">
                {status[0].toUpperCase() + status.slice(1)}
              </Button>
            </form>
          </DropdownMenuItem>
         </div>
        
      ))}
                </DropdownMenuContent>
              </DropdownMenu>
    
    </>
  );
};