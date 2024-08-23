"use client"
import React, { useEffect } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MapStatus } from "./ProductsTable";
import clsx from "clsx";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { handleSetStatusProductAction } from "@/lib/actions";
export const HandleSetStatusProduct = ({
  productId,
  status,
}: {
  productId: string;
  status: string;
}) => {
  const router = useRouter();
  const handleSetStatusProduct = useServerAction(handleSetStatusProductAction, {
  onSuccess:() =>{
    router.refresh()
toast.success("dddddd")
  },
    onError: (err) => {
// toast.error(err.err.message)
      toast.error("Not updated!");
    },
  });
  useEffect(()=>{
    if(handleSetStatusProduct.isSuccess){
      router.refresh()
      toast.success("dddddd")
    }
  },[handleSetStatusProduct,router])

  return (
    <>
      {MapStatus.map((productStatus, _) => (
        <div className="w-full space-y-4" key={productStatus}>
          <DropdownMenuItem
            className={clsx("focus:text-blue-500 cursor-pointer mt-2 h-10", {
              "bg-muted text-blue-500 pointer-events-none":
                productStatus === status,
            })}
          >
         
            <form
              className="w-full"
              action={handleSetStatusProduct.executeFormAction}
            >
              <input type="hidden" name="productStatus" value={productStatus} />
              <input type="hidden" name="productId" value={productId} />
              <Button variant={"pStatus"} className="p-0" type="submit">
                {productStatus[0].toUpperCase() + productStatus.slice(1)}
              </Button>
            </form>
          </DropdownMenuItem>
        </div>
      ))}
    </>
  );
};