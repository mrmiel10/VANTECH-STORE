"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { TrashIcon } from 'lucide-react'
export const EditProductButton = ({productId}:{productId:string}) => {
    const router = useRouter()
    
  return (
    <Button
    onClick={()=>{router.push(`/${productId}/editProduct`)}}
      className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
      variant={"outline"}
    >
      <Pencil className="size-5" />
    </Button>
  )
}
// export const DeleteProductButton = async(productId:string) =>{
//   return (
//     <Button
//     onClick={async()=>{
//       try {
//         await deleteProduct()
//       } catch (error) {
        
//       }
//     }}
//     className="text-muted-foreground hover:bg-blue-500 hover:text-white rounded-full p-2"
//     variant={"outline"}
//   >
//     {" "}
//     <TrashIcon className="size-5" />
//   </Button>
//   )
// }

