"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useQueryState } from 'nuqs'
import { useSearchParams } from 'next/navigation'
export const AdminSearchProducts = ({placeholder}:{
    placeholder:string
}) => {
  const [searchProduct,setsearchProduct] = useQueryState("searchProduct",{
    defaultValue:"",
    shallow:false,
     throttleMs:500,
    // clearOnDefault: true
  

})
const searchParams = useSearchParams()
console.log(searchProduct)
const handleSearch = (term:string) => {
  // console.log(term);
  console.log(`Searching... ${term}`);
   const params = new URLSearchParams(searchParams);
   params.set('page', '1');
  
   setsearchProduct(term)

};

  return (
    <Card className="px-16 py-8 flex">
            <div className="relative  w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={placeholder}
                className="w-full rounded-lg bg-background pl-8"
                value={searchProduct}
                // defaultValue={searchParams.get("query")?.toString() || ""}
                onChange={(e)=>{
                    handleSearch(e.target.value)
                  }}
              />
            </div>
          </Card>
  )
}

