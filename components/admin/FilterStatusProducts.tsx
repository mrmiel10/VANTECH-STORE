import React from 'react'
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
import { ListFilter } from 'lucide-react';
const FilterStatusProducts = () => {
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
      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked>
        Active
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>
        Archived
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default FilterStatusProducts