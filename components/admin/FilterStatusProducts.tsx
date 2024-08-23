"use client"
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
import { MapStatus } from './ProductsTable';
import { CheckedState } from "@radix-ui/react-checkbox";
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
const FilterStatusProducts = () => {
  const searchParams = useSearchParams()
  const {replace} = useRouter();

  const pathname = usePathname();
  
  const handleFilterChange = useCallback(
    (status: string, checked: CheckedState) => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        params.set("status", status);             
      } else {
        params.delete("status", status);
      }
      replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, replace]
  );
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
      <DropdownMenuLabel className='text-blue-500'>Filter by</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {MapStatus.map((status,_)=>(
         <DropdownMenuCheckboxItem
         className={clsx(
          'text-muted-foreground focus:text-blue-500 ',
          searchParams.has("status",status) && "bg-muted text-blue-500 "
         )}
          key={status} 
          checked={searchParams.has("status",status)}
          onCheckedChange={(checked)=> handleFilterChange(status,checked)}
          >
        {status}
        </DropdownMenuCheckboxItem>
      ))}
 
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default FilterStatusProducts