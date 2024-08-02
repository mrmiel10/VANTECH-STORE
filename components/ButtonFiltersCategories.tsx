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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const ButtonFiltersCategories = () => {
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
    <>
      {pathname === "/" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus:outline-none">
            <Button
              className="focus-visible:ring-offset-0 focus-visible:ring-0 active:outline-none focus-visible:outline-none"
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
                <DropdownMenuItem
                  className="px-2 py-1.5 w-full flex items-center gap-1"
                  onClick={() => {
                    handleSetParamsSortFilters(filter.name, filter.value);
                  }}
                  key={filter.id}
                >
                  <div className="size-4 flex justify-center items-center">
                    {" "}
                    {searchParams.has(filter.name, filter.value) ? (
                      <Check />
                    ) : null}
                  </div>

                  {filter.id}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
};

export default ButtonFiltersCategories;
