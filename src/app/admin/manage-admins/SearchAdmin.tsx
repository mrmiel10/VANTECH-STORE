"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { useQueryState } from 'nuqs'
import { useSearchParams } from "next/navigation";
export const SearchAdmin = () => {
    const [search,setsearch] = useQueryState("search",{
        defaultValue:"",
        shallow:false,
         throttleMs:500,
        // clearOnDefault: true
      
    
    })
    const searchParams = useSearchParams();
    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        setsearch(term);
      };
    
  return (
    <div className="relative">

    <Input
      type="search"
      placeholder={"search admin..."}
      className="placeholder:text-normal placeholder:text-sm border-input text-muted-foreground w-full rounded-lg bg-background  ring-blue-500 focus:ring-blue-500"
      value={search}
    
      onChange={(e)=>{
          handleSearch(e.target.value)
        }}
    />
  </div>

  )
}
