"use client"
import { Input } from '@/components/ui/input'
import React from 'react'
import { SearchIcon } from "lucide-react";
// import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQueryState } from 'nuqs';
import clsx from 'clsx';
const SearchComponent = ({placeholder}:{placeholder:string}) => {
    const [query,setQuery] = useQueryState("query",{
        defaultValue:"",
        shallow:false,
         throttleMs:500,
        // clearOnDefault: true
    })
    const searchParams = useSearchParams()
  console.log(query)
    const handleSearch = (term:string) => {
        // console.log(term);
        console.log(`Searching... ${term}`);
         const params = new URLSearchParams(searchParams);
         params.set('page', '1');
        
          setQuery(term)
   
    };
    


  return (
    <div className="group relative flex-1">
    <SearchIcon className={clsx(
      "peer-focus/search:hidden absolute bg-blue-500 text-white rounded-full p-1 right-3 top-1/2 -translate-y-1/2 w-7 h-7 ",
     { "hidden":query !== ""}
    )
    } />
    <Input
    
    value={query}
    // defaultValue={searchParams.get("query")?.toString() || ""}
    onChange={(e)=>{
        handleSearch(e.target.value)

    }}
      type="search"
      placeholder="Rechercher..."
      className="peer/search w-full pl-10 pr-4 py-2  rounded-full bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary"
    />
  </div>
  )
}

export default SearchComponent