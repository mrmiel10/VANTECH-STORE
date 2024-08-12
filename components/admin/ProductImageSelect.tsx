import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Upload } from "lucide-react";
import SelectImage from './SelectImage';
const ProductImageSelect = () => {
  return (
    <Card className="overflow-hidden" x-chunk="chunk-4">
    <CardHeader>
      <CardTitle className="text-blue-500">
        Product Images
      </CardTitle>
      <CardDescription>
        select images for the product
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-6">
        <SelectImage className='h-28 col-span-2 ' />
        <SelectImage className='h-28 ' />
        <SelectImage className='h-28 ' />
        <SelectImage className='h-20 col-span-2' />
        {/* <div className=" h-28 w-full rounded-lg col-span-2 flex justify-center items-center border-dashed border-muted-foreground text-sm text-blue-500 border cursor-pointer hover:bg-muted">
          <Upload />
        </div> */}

      </div>
   
    </CardContent>
  </Card>
  )
}

export default ProductImageSelect