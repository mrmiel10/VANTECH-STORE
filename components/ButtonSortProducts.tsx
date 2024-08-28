"use client"
import React, { useCallback, useEffect, useState } from "react";

import { ArrowUp,ArrowDown } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { sortFilters } from "@/lib/listFiltersProducts";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { CheckedState } from "@radix-ui/react-checkbox";
const ButtonSortProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleFilterChange = useCallback(
    (filter: {
      id: string;
      name: string;
      value: string;
  }, checked: CheckedState) => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        params.set(filter.name, filter.value);
      } else {
        params.delete(filter.name, filter.value);
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <Button
          className="focus-visible:ring-offset-0 focus-visible:ring-0 hover:text-blue-500 transition active:outline-none focus-visible:outline-none"
          variant="outline"
          size="sm"
        >
          <ArrowUp className="size-4" />
          <ArrowDown className="size-4" />
          Trier
      
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="">
        {sortFilters.map((filter, index) => {
          return (
            <DropdownMenuCheckboxItem
            
            checked={searchParams.has(filter.name, filter.value)}
            onCheckedChange={(checked) =>
              handleFilterChange(filter, checked)
            }
               key={filter.id}
            
             className="focus:text-blue-500 text-muted-foreground">{filter.id}</DropdownMenuCheckboxItem>
           
          );
        })}
        {/* <DropdownMenuSeparator /> */}
   
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonSortProducts;
