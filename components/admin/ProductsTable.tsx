import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  MoreHorizontal,

  PlusCircle,

} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Status from "./Status";

import { MenuIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { EllipsisIcon } from "lucide-react";
import Shoe from "../../../../../public/blackShoe.jpg";
import Image from "next/image";
import MobileProducts from "./MobileProducts";
import { findProducts } from "@/lib/actions";
import { Prisma } from "@prisma/client";

import { formatPrice } from "@/lib/formatPrice";
import * as z from "zod";

const ProductsTable = async() => {
    const parseImages = (images:any) =>{
        const safeImages:{image:string}[] =JSON.parse(JSON.stringify(images as string) )
        return safeImages
    }
    const products = await findProducts()
    
    console.log(products)
  
   for (const product of products) {
    
    console.log(parseImages(product.images)[0].image)
   }
 
  return (
    <>
     <MobileProducts />

<Table className="text-muted-foreground hidden md:table">
  <TableHeader className="">
    <TableRow>
    
      <TableHead className=" w-[100px]">
        <span className="sr-only">Image</span>
      </TableHead>
      <TableHead className="text-blue-500 font-semibold ">
        Name
      </TableHead>
      <TableHead className="text-blue-500 font-semibold ">
        Status
      </TableHead>
      <TableHead className="text-blue-500 font-semibold ">
        Price
      </TableHead>
      <TableHead className="text-blue-500 font-semibold ">
        Total Sales
      </TableHead>

      <TableHead>
        <span className="sr-only w-7">others features</span>
      </TableHead>
      <TableHead>
        <span className="sr-only">Actions</span>
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {products.map((product,i)=>(
     <TableRow key={product.id}>

     <TableCell className="">
       <Image
         alt="Product image"
         className="aspect-square rounded-md object-cover"
         height="64"
         src={parseImages(product.images)[0].image}
         width="64"
       />
     </TableCell>
     <TableCell className="font-medium text-muted-foreground">
       {product.name}
     </TableCell>

     <TableCell>
       <Status status="active" />
     </TableCell>
     <TableCell className="font-semibold">{formatPrice(product.price)}</TableCell>
     <TableCell className="font-semibold">25</TableCell>

     <TableCell>
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button
             aria-haspopup="true"
             size="icon"
             variant="ghost"
           >
             <MoreHorizontal className="h-4 w-4" />
             <span className="sr-only">Toggle menu</span>
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent
           align="end"
           className="px-4 py-2 text-muted-foreground "
         >
           <DropdownMenuLabel className="text-blue-500">
             Others Features
           </DropdownMenuLabel>
           <DropdownMenuSeparator />
           <DropdownMenuItem className="focus:bg-transparent">
             Catégorie: {product.category}
           </DropdownMenuItem>
           <DropdownMenuItem className="focus:bg-transparent">
             Marque:{product.brand}
           </DropdownMenuItem>
           <DropdownMenuItem className="focus:bg-transparent">
             {product.reviews.length} Reviews
           </DropdownMenuItem>
           <DropdownMenuLabel className="text-blue-500">
             Set product Status
           </DropdownMenuLabel>
           <DropdownMenuSeparator />
           <DropdownMenuCheckboxItem
             className="focus:text-blue-500"
             checked
           >
             Active
           </DropdownMenuCheckboxItem>
           <DropdownMenuCheckboxItem
             className="focus:text-blue-500"
             checked
           >
             Draft
           </DropdownMenuCheckboxItem>
           <DropdownMenuCheckboxItem
             className="focus:text-blue-500"
             checked
           >
             Archive
           </DropdownMenuCheckboxItem>
         </DropdownMenuContent>
       </DropdownMenu>
     </TableCell>

     <TableCell className="text-center">
       <div className="flex gap-2">
         {" "}
         <Button
           className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
           variant={"outline"}
         >
           <Pencil className="size-5" />
         </Button>
         <Button
           className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
           variant={"outline"}
         >
           {" "}
           <TrashIcon className="size-5" />
         </Button>
       </div>
     </TableCell>
   </TableRow>
  ))}

  </TableBody>
</Table></>
   
  )
}

export default ProductsTable