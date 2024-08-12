"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Check, ChevronDownIcon } from "lucide-react";

import { filtersByCategories } from "@/lib/listFiltersProducts";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";
const ButtonFiltersCategories = () => {
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
    <>
      {pathname === "/" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus:outline-none">
            <Button
              className="focus-visible:ring-offset-0 focus-visible:ring-0 active:outline-none focus-visible:outline-none hover:text-blue-500"
              variant="outline"
              size="sm"
            >
              Trier par catégorie
              {/* <ChevronDownIcon className="size-4 ml-2" /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {filtersByCategories.map((filter, index) => {
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
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
};

export default ButtonFiltersCategories;
