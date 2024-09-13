"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Permissions } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useCallback } from "react";
export const ManagePermissionsBtn = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilterChange = useCallback(
    (key: string, value: string, checked: CheckedState) => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        params.set(key, value);
      } else {
        params.delete(key, value);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="focus:ring-0 h-8 px-4 gap-1 text-sm hover:text-blue-500 focus-visible:text-blue-500"
        >
          {/* <ListFilter className="h-3.5 w-3.5" /> */}
          <span className="font-normal">Manage permissions</span>
          {/* <span className="sr-only sm:not-sr-only">Filter</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel className="text-blue-500">
          Display admin based on their permissions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Permissions.map((permission, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            className={
              clsx()
              // searchParams.has("status", deliverystatus) &&
              //   "bg-muted text-blue-500 pointer-events-none"
            }
            checked={searchParams.has(`perm_${index + 1}`, permission.id)}
            onCheckedChange={(checked) =>
              handleFilterChange(`perm_${index + 1}`, permission.id, checked)
            }
          >
            {permission.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
