"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { mapStatus } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useQueryState } from "nuqs";
const FilterStatusProducts = () => {
  const [statusProduct, setstatusProduct] = useQueryState("status", {
    defaultValue: "",
    shallow: false,
  });
  const searchParams = useSearchParams();



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-blue-500">
          Filter by
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mapStatus.map((status, _) => (
          <DropdownMenuCheckboxItem
            className={clsx(
              "text-muted-foreground focus:text-blue-500 ",
              searchParams.has("status", status) && "bg-muted text-blue-500 "
            )}
            key={status}
            checked={searchParams.has("status", status)}
            onCheckedChange={(checked) => checked ? setstatusProduct(status) : setstatusProduct("")}
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterStatusProducts;
