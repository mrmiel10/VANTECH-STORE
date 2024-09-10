"use client";
import React, { useEffect } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { mapStatus } from "@/lib/utils";
import clsx from "clsx";
import { useServerAction } from "zsa-react";

import { Button } from "@/components/ui/button";
import { handleSetStatusProductAction } from "@/lib/actions";

export const HandleSetStatusProduct = ({
  productId,
  status,
}: {
  productId: string;
  status: string;
}) => {
  const { execute } = useServerAction(handleSetStatusProductAction);

  return (
    <div className="flex flex-col gap-1">
      {mapStatus.map((productStatus, _) => (
        <div className="w-full" key={productStatus}>
          <DropdownMenuItem
            className={clsx("focus:text-blue-500 cursor-pointer h-10", {
              "bg-muted text-blue-500 pointer-events-none":
                productStatus === status,
            })}
          >
            <form
              className="w-full"
              // action={handleSetStatusProduct.executeFormAction}
              onSubmit={async (event) => {
                // "use server"
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                console.log(formData);
                const [data, err] = await execute(formData, {
                  productId: productId,
                });
              }}
            >
              <input type="hidden" name="productStatus" value={productStatus} />

              <Button variant={"pStatus"} className="p-0" type="submit">
                <span>
                  {" "}
                  {productStatus[0].toUpperCase() + productStatus.slice(1)}
                </span>
                {productStatus === status && (
                  <div className="ml-auto size-2 bg-blue-500 rounded-full" />
                )}
              </Button>
            </form>
          </DropdownMenuItem>
        </div>
      ))}
    </div>
  );
};
