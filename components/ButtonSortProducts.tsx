"use client"
import React, { useCallback, useEffect, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { sortFilters } from "@/lib/listFiltersProducts";
import { Check } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
const ButtonSortProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleSetParamsSortFilters = useCallback(
    (name: string, value: string) => {
      console.log(name, value);

      const params = new URLSearchParams(searchParams.toString());
      if (params.has(name, value)) {
        params.delete(name, value);
      } else {
        params.set(name, value);
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <Button
          className="focus-visible:ring-offset-0 focus-visible:ring-0 active:outline-none focus-visible:outline-none"
          variant="outline"
          size="sm"
        >
          <ArrowUpAZ className="size-4" />
          <ArrowDownAZ className="size-4" />
          Trier
          {/* <ChevronDownIcon className="size-4 ml-2" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortFilters.map((filter, index) => {
          return (
            <DropdownMenuItem
            className="w-full flex items-center gap-2"
              onClick={() => {
              
                handleSetParamsSortFilters(filter.name, filter.value);
              }}
              key={filter.id}
            >
              <div className="size-5 flex justify-center items-center">
                {" "}
                  {searchParams.has(filter.name,filter.value) ?  (<Check />) : null } 
              </div>

              {/* {searchParams.has(filter.name,filter.value) ?  (<Check />) : null } */}

              {filter.id}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Effacer tous les filtres</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonSortProducts;
