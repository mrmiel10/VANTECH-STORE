import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Card } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { EllipsisIcon, Pencil, TrashIcon } from 'lucide-react';
  import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Status from './Status';
import Shoe from "../../public/blackShoe.jpg"
  const MobileProducts = () => {
  return (
    <Card className="px-6 py-2 sm:py-4  text-muted-foreground block md:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex ">
          <Button
            variant={"ghost"}
            className="ml-auto rounded-full size-6  p-0"
          >
            {" "}
            <EllipsisIcon className="size-5 " />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-2 text-muted-foreground"
      >
        <DropdownMenuLabel className="text-blue-500">
          Set product status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className="focus:text-blue-500" checked>
          Active
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="focus:text-blue-500" checked>
          Draft
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="focus:text-blue-500" checked>
          Archive
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <div className="flex flex-col items-center w-full sm:pr-8">
      <div className="grid grid-cols-[1fr_150px] max-sm:gap-y-2">
        <div className="col-span-2 sm:col-span-1 flex gap-4 max-size-500:flex-col items-center">
          <div className="w-32 h-32 relative shrink-0">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              fill
              src={Shoe}
            />
          </div>
          <div>
            <div className="flex flex-col gap-1">
              <p className="font-medium">
                {" "}
                Name Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Commodi, voluptatibus?
              </p>
              <p className="text-2xl text-blue-500 mt-auto">$3000</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:ml-auto flex flex-col gap-2 ">
          <div className="flex gap-2 flex-wrap">
            <div className="sm:w-full text-start  sm:text-end">
              Ordinateur de bureau
            </div>
            <Separator className="h-5 bg-muted-foreground sm:hidden" orientation="vertical" />
            <div className="sm:w-full text-start sm:text-end">
              marque:HP
            </div>
          </div>
          <div className="sm:w-full justify-start sm:justify-end flex items-center gap-1">
            Status: 
            <Status status="active"  />
          </div>
        </div>
      </div>
      {/* <Separator /> */}
      <Separator className="my-4" />
      <div className="flex items-center w-full">
        <div>Total Sales:25444</div>
        <div className="flex gap-2 ml-auto">
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
      </div>
    </div>
  </Card>
//     <Card className="px-6 py-2 sm:py-4  text-muted-foreground block md:hidden">
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className="flex ">
//           <Button
//             variant={"ghost"}
//             className="ml-auto rounded-full size-6  p-0"
//           >
//             {" "}
//             <EllipsisIcon className="size-5 " />
//           </Button>
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="end"
//         className="p-2 text-muted-foreground"
//       >
//         <DropdownMenuLabel className="text-blue-500">
//           Set product status
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuCheckboxItem className="focus:text-blue-500" checked>
//           Active
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem className="focus:text-blue-500" checked>
//           Draft
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem className="focus:text-blue-500" checked>
//           Archive
//         </DropdownMenuCheckboxItem>
//       </DropdownMenuContent>
//     </DropdownMenu>

//     <div className="flex flex-col items-center w-full sm:pr-8">
//       <div className="flex gap-4 w-full max-sm:flex-col">
//         <div className="flex gap-4 items-stretch max-sm:flex-col">
//           <div className="w-32 h-32 relative shrink-0">
//             <Image
//               alt="Product image"
//               className="aspect-square rounded-md object-cover"
//               fill
//               src={Shoe}
//             />
//           </div>
//           <div>
//             <div className="flex flex-col">
//               <p className="font-medium">
//                 {" "}
//                 Name Lorem ipsum dolor, sit amet consectetur
//                 adipisicing elit. Commodi, voluptatibus?
//               </p>
//               <p className="text-2xl text-blue-500 mt-auto">$3000</p>
//             </div>
//           </div>
//         </div>
//         <div className="md:ml-auto flex flex-col gap-2 ">
//           <div className="flex gap-2 flex-wrap">
//             <div className="sm:w-full text-start  sm:text-end">
//               Ordinateur de bureau
//             </div>
//             <Separator className="h-5 bg-muted-foreground sm:hidden" orientation="vertical" />
//             <div className="sm:w-full text-start sm:text-end">
//               marque:HP
//             </div>
//           </div>
//           <div className="sm:w-full justify-start sm:justify-end flex items-center gap-1">
//             Status: 
//             <Status status="active"  />
//           </div>
//         </div>
//       </div>
//       {/* <Separator /> */}
//       <Separator className="my-4" />
//       <div className="flex items-center w-full">
//         <div>Total Sales:25444</div>
//         <div className="flex gap-2 ml-auto">
//           {" "}
//           <Button
//             className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
//             variant={"outline"}
//           >
//             <Pencil className="size-5" />
//           </Button>
//           <Button
//             className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
//             variant={"outline"}
//           >
//             {" "}
//             <TrashIcon className="size-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   </Card>
  )
}

export default MobileProducts