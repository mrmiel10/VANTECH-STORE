"use client"
import React, { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckedState } from "@radix-ui/react-checkbox";
import { searchParamsCache } from "@/lib/nuqs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import clsx from "clsx";
export const SetStatusProduct = () => {
  const mapStatus = ["active", "draft", "archive"];
  const [query, setStatus] = useQueryState("status", {
    defaultValue: "",
    shallow: false,
    throttleMs: 500,
    // clearOnDefault: true
  });
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleFilterChange = useCallback(
    (val: string, checked: CheckedState) => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        setStatus(val)
      //  params.set("status", val);
      } else {
        params.delete("status", val);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );
  return (
    <div>
      {" "} 
      {mapStatus.map((status, _) => (
        <DropdownMenuCheckboxItem
          className="focus:text-blue-500"
          checked={searchParams.has("status", status)}
          onCheckedChange={(checked) => handleFilterChange(status, checked)}
        >
          {status[0].toUpperCase() + status.slice(1)}
        </DropdownMenuCheckboxItem>
      ))}
    </div>
  );
};
